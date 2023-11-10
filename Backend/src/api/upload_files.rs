use mime_guess::from_path;
use actix_web::{HttpRequest, HttpResponse, web};
use actix_multipart::{Multipart, MultipartError};
use futures::StreamExt;
use std::fs::{File, self};
use std::io::{Write, self, Bytes};
use crate::auth::jwt::JwToken;
use reqwest::{Client, self, multipart, multipart::Part};
use serde_derive::{Serialize, Deserialize};
use tokio_postgres::Statement;
use chrono::NaiveDate;
#[derive(Debug, Deserialize, Serialize)]
struct Student {
    name: String,
    rollnumber: String,
    attendance: i32,
}
pub async fn upload_handler(mut images: Multipart, token: JwToken, req: HttpRequest) -> Result<HttpResponse, actix_web::Error> {
    // println!("1");
    let client =Client::builder().build().unwrap();
    // println!("2");
    // println!("Request {:?}",  req.headers().get("date").unwrap());
    let date: String = req.headers().get("dates").unwrap().to_str().unwrap().to_string();
    let classname: String = req.headers().get("classname").unwrap().to_str().unwrap().to_string();
    let user_name = token.username;
    println!("3");
    let user_directory = format!("images/{}", user_name);
    if !user_directory_exists(&user_directory) {
        create_directory(&user_directory)?;
    }

    // Check if date directory exists within the user's directory, create if not
    let date_directory = format!("{}/{}", user_directory, date);
    if !date_directory_exists(&date_directory) {
        create_directory(&date_directory)?;
    }
    let mut file_paths: Vec<String> = Vec::new();
    while let Some(item) = images.next().await {
        let mut field = item?;
        println!("{}", field.name());
        let cond = field.content_disposition();
        println!("{:?}", cond.get_filename());
        // Generate a random filename for the image (or use a meaningful filename based on your requirements)
        let file_name_op = cond.get_filename();
        let mut file_name: &str = "";
        match file_name_op {
            None => {continue;}
            Some(t) => {file_name = t}
        }
        println!("Hey nice");
        // Create a new file on the server to save the image
        let mut file = File::create(format!("images/{}/{}/{}", user_name, date, file_name))
            .map_err(|_| actix_web::error::ErrorInternalServerError("Error creating file"))?;
        let mut filepath = format!("images/{}/{}/{}", user_name, date, file_name);
        // Write the binary data (chunk) directly to the file
        while let Some(chunk) = field.next().await {
            match chunk {
                Ok(_) => {}
                Err(_) => {continue;}
            }
            file.write_all(&chunk?)
                .map_err(|_| actix_web::error::ErrorInternalServerError("Error writing to file"))?;
        }
        // let form_data = multipart::Form::new()
        //     .file("image", format!("images/{}", filename))
        //     .map_err(|_| actix_web::error::ErrorInternalServerError("Error creating form data"))?;
        // let mime_type = from_path(&filepath).first_or_octet_stream();
        file_paths.push(filepath.clone());
        // let image_data = fs::read(&filepath).unwrap();
        // println!("{:?}", &image_data);

    }

    let mut form = multipart::Form::new();
    let cl: tokio_postgres::Client = crate::auth::register::connect().await;
    let s: Statement = cl.prepare("INSERT INTO photo (username, classname, photo, date) VALUES ($1, $2, $3, $4)").await.expect("Wrong photo putting query");
    for file_path in file_paths {
        let file_content = fs::read(&file_path).unwrap();
        cl.execute(&s, &[&user_name, &classname, &file_path, &date]).await.expect("Error putting photos into database");
        form = form.part("files", Part::bytes(file_content).file_name(file_path));
    }

    let client = Client::new();
    let response = client
        .post("http://127.0.0.1:8000/uploadfiles")
        .multipart(form)
        .send()
        .await
        .unwrap();

    let response_text = response.text().await.unwrap();
    println!("{}", response_text);
    // let cleaned_response = response_text.replace("\\", "").replace("\n", "");
    // println!("{}", cleaned_response);
    let usc: String = serde_json::from_str(&response_text).unwrap();
    // println!("usc {}", &usc);
    let att: Vec<Student> = serde_json::from_str(&usc).unwrap();
    // println!("{:?}", att);
    // println!("{}", &response_text.chars().nth(3).unwrap());
    update_attendance(&att, &date, &user_name, &classname).await.expect("Error updating the database");
    Ok(HttpResponse::Ok().json(att))
}

fn user_directory_exists(path: &str) -> bool {
    fs::metadata(path).is_ok()
}

fn date_directory_exists(path: &str) -> bool {
    fs::metadata(path).is_ok()
}

fn create_directory(path: &str) -> io::Result<()> {
    fs::create_dir_all(path)
}
async fn update_attendance(att: &Vec<Student>, date: &String, user_name: &str, classname: &str) -> io::Result<()> {
    let client = crate::auth::register::connect().await;
    let s: Statement  = client.prepare("INSERT INTO attendance (username, classname, date, student, attendance) VALUES ($1, $2, $3, $4, $5)").await.expect("Wrong attendance putting query");
    for i in att{
        let mut x: bool = false;
        if i.attendance == 0  {
            x=false;
        } else {
            x=true;
        }
        client.execute(&s, &[&user_name, &classname, &date, &i.rollnumber, &x]).await.expect("Error updating attendance to the database");
    }
    Ok(())
}
