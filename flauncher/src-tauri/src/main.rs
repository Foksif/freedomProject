// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod state;
mod commands;
mod services;

use state::AppState;
use commands::{run_minecraft, check_minecraft, check_file_exists};

fn main() {

    let app_state = AppState::new();

    tauri::Builder::default()
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![run_minecraft, check_minecraft, check_file_exists])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
