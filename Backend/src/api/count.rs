use actix_web::{HttpRequest, HttpResponse};
use serde_derive::Serialize;
use tokio_postgres::{Row, Statement};
use crate::auth::jwt::JwToken;
#[derive(Serialize, Debug)]
pub struct Resp {
    pub present: i64,
    pub total: i64
}
impl From<Row> for Resp {
    fn from(value: Row) -> Self {
        Resp {
            present: value.get("attendance_true_count"),
            total: value.get("total_days_count"),
        }
    }
}
pub async fn fetch_count(token: JwToken, req: HttpRequest) -> Result<HttpResponse, actix_web::Error> {
    println!("token {}", token.username);
    let client = crate::auth::register::connect().await;
    let s: Statement  = client.prepare("SELECT
                                       COUNT(CASE WHEN attendance = TRUE THEN 1 ELSE NULL END) AS attendance_true_count,
                                       COUNT(*) AS total_days_count
                                       FROM
                                       attendance
                                       WHERE
                                       username = $1 AND
                                       classname = $2 AND student=$3
                                       GROUP BY
                                       username, classname, student;"
    ).await.expect("Wrong class fetching query");
    let classname: String = req.headers().get("classname").unwrap().to_str().unwrap().to_string();
    let roll_num: String = req.headers().get("roll_num").unwrap().to_str().unwrap().to_string();
    let class: Vec<Row> = client.query(&s, &[&token.username, &classname, &roll_num]).await.expect("Error fetching class names");
    let ans: Resp = Resp {
        present: class[0].get("attendance_true_count"),
        total: class[0].get("total_days_count"),
    };
    println!("{:?}", &ans);
    Ok(HttpResponse::Ok().json(ans))
}