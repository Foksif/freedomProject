use std::path::Path;
use tauri::State;
use std::sync::Arc;
use crate::state::AppState;
use crate::services::minecraft::{start_minecraft, is_minecraft_running};
use std::env;

#[tauri::command]
pub fn check_file_exists() -> bool {
    let user_name = env::var("USERNAME").unwrap_or_else(|_| String::from("default_user"));

    let path = format!("C:\\Users\\{}\\AppData\\Roaming\\.neosoft\\launch.bat", user_name);
    Path::new(&path).exists()
}

#[tauri::command]
pub fn run_minecraft(state: State<'_, Arc<AppState>>) -> Result<String, String> {
    start_minecraft(state.clone())
}

#[tauri::command]
pub fn check_minecraft(state: State<'_, Arc<AppState>>) -> bool {
    is_minecraft_running(state.clone())
}
