use actix_web::HttpResponse;
use serde_derive::Serialize;
use tokio_postgres::{Row, Statement};
use crate::auth::jwt::JwToken;
#[derive(Serialize)]
pub struct Resp {
    pub class: String,
    pub strength: i64,
}
impl From<Row> for Resp {
    fn from(row: Row) -> Self {
        Resp {
            class: row.get("classname"),
            strength: row.get("num_of_occurrences"),
        }
    }
}
pub async fn fetch_class(token: JwToken) -> Result<HttpResponse, actix_web::Error> {
    println!("token {}", token.username);
    let client = crate::auth::register::connect().await;
    let s: Statement  = client.prepare("SELECT classname, COUNT(classname) as num_of_occurrences
        FROM class
        WHERE username=$1
        GROUP BY classname;").await.expect("Wrong class fetching query");
    let class: Vec<Row> = client.query(&s, &[&token.username]).await.expect("Error fetching class names");
    let ans: Vec<Resp> = class.into_iter().map(Resp::from).collect();
    Ok(HttpResponse::Ok().json(ans))
}