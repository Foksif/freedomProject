use std::path::Path;
use tauri::State;
use std::sync::Arc;
use crate::state::AppState;
use crate::services::minecraft::{start_minecraft, is_minecraft_running};
use std::env;

use std::fs::File;
use std::path::PathBuf;
use zip::ZipArchive;
use tauri::Window;

#[tauri::command]
pub async fn extract_zip(
    zip_path: String,
    extract_to: String,
    window: Window,
) -> Result<(), String> {
    println!("Starting extraction of {} to {}", zip_path, extract_to);

    let file = File::open(&zip_path)
        .map_err(|e| format!("Failed to open zip file: {}", e))?;
    let mut archive = ZipArchive::new(file)
        .map_err(|e| format!("Failed to read zip archive: {}", e))?;

    let total_files = archive.len();
    let mut processed_files = 0;

    for i in 0..total_files {
        let mut file = archive.by_index(i)
            .map_err(|e| format!("Failed to read file {} in archive: {}", i, e))?;
        let outpath = PathBuf::from(&extract_to).join(file.mangled_name());

        if file.name().ends_with('/') {
            std::fs::create_dir_all(&outpath)
                .map_err(|e| format!("Failed to create directory {}: {}", outpath.display(), e))?;
        } else {
            if let Some(p) = outpath.parent() {
                if !p.exists() {
                    std::fs::create_dir_all(p)
                        .map_err(|e| format!("Failed to create parent directories for {}: {}", outpath.display(), e))?;
                }
            }

            let mut outfile = File::create(&outpath)
                .map_err(|e| format!("Failed to create file {}: {}", outpath.display(), e))?;
            std::io::copy(&mut file, &mut outfile)
                .map_err(|e| format!("Failed to write to file {}: {}", outpath.display(), e))?;
        }

        processed_files += 1;
        let progress = (processed_files as f64 / total_files as f64 * 100.0).round() as i32;

        window.emit("extract_progress", progress)
            .map_err(|e| format!("Failed to send progress update: {}", e))?;

        println!("Extracted: {} ({}%)", outpath.display(), progress);
    }

    println!("Extraction completed successfully");
    Ok(())
}

#[tauri::command]
pub fn check_file_exists() -> bool {
    let user_name = env::var("USERNAME").unwrap_or_else(|_| String::from("default_user"));
    let path = format!("C:\\Users\\{}\\AppData\\Roaming\\.neosoft\\launch.bat", user_name);
    Path::new(&path).exists()
}

#[tauri::command]
pub fn run_minecraft(state: State<'_, Arc<AppState>>, nickname: String) -> Result<String, String> {
    start_minecraft(state.clone(), nickname)
}

#[tauri::command]
pub fn check_minecraft(state: State<'_, Arc<AppState>>) -> bool {
    is_minecraft_running(state.clone())
}