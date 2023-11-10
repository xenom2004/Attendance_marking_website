use actix_web::{HttpRequest, HttpResponse};
use serde_derive::Serialize;
use tokio_postgres::{Row, Statement};
use crate::auth::jwt::JwToken;
#[derive(Serialize)]
pub struct AttBool {
    pub roll_num: String,
    pub status: bool,
    pub name: String,
}
impl From<Row> for AttBool {
    fn from(value: Row) -> Self {
        AttBool {
            roll_num: value.get("student"),
            status: value.get("attendance"),
            name: "".to_string(),
        }
    }
}
pub async fn attendance(token: JwToken, req: HttpRequest) -> Result<HttpResponse, actix_web::Error> {
    println!("Inside");
    println!("{:?}", req.headers());
    let date: String = req.headers().get("dates").unwrap().to_str().unwrap().to_string();
    let classname: String = req.headers().get("classname").unwrap().to_str().unwrap().to_string();
    let client = crate::auth::register::connect().await;
    let s: Statement = client.prepare("SELECT student, attendance from attendance where username=$1 and date=$2 and classname=$3").await.expect("Wrong attendance fetching query");
    let data: Vec<Row> = client.query(&s, &[&token.username, &date, &classname]).await.expect("Error fetching attendance from the database");
    let mut ans: Vec<AttBool> = data.into_iter().map(AttBool::from).collect();
    let s2: Statement = client.prepare("SELECT name from students where id=$1").await.expect("Error fetching student_name query");
    for i in ans.iter_mut() {
        let name: Vec<Row> = client.query(&s2, &[&i.roll_num]).await.expect("Error getting name from the database");
        let name = name[0].get("name");
        i.name = name;
    }
    println!("{}", ans.len());
    Ok(HttpResponse::Ok().json(ans))
}