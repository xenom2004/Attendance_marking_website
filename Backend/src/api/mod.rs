mod upload_files;
mod classes;
mod attendance;
mod count;

use actix_web::web;
use upload_files::upload_handler;
use classes::fetch_class;
use attendance::attendance;
use count::fetch_count;
pub fn api_config (cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .route("/uploadfiles", web::post().to(upload_handler))
            .route("/classes", web::get().to(fetch_class))
            .route("/attendance", web::get().to(attendance))
            .route("/count", web::get().to(fetch_count))
    );
}