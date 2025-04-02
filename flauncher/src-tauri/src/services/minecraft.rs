use std::process::{Command, Stdio};
use std::sync::Arc;
use tauri::State;
use crate::state::AppState;
use std::env;

pub fn start_minecraft(state: State<Arc<AppState>>, nickname: String) -> Result<String, String> {
    let user_name = env::var("USERNAME").unwrap_or_else(|_| String::from("default_user"));

    let mut process_lock = state.minecraft_process.lock().unwrap();
    if process_lock.is_some() {
        return Err("Minecraft уже запущен.".to_string());
    }

    let param = format!("{} {}", nickname, user_name);
    let command = format!(
        r#"C:\Users\{}\AppData\Roaming\.neosoft\launch.bat {}"#,
        user_name,
        param
    );

    let child = Command::new("cmd")
        .arg("/C")
        .arg(command)
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .spawn();

    match child {
        Ok(child_process) => {
            *process_lock = Some(child_process);
            Ok(format!("Minecraft запущен с параметром: {}", param))
        }
        Err(e) => Err(format!("Ошибка запуска процесса: {}", e)),
    }
}

pub fn is_minecraft_running(state: State<Arc<AppState>>) -> bool {
    let mut process = state.minecraft_process.lock().unwrap();
    if let Some(child) = process.as_mut() {
        match child.try_wait() {
            Ok(Some(_)) => {
                *process = None;
                false
            }
            Ok(None) => true,
            Err(_) => false,
        }
    } else {
        false
    }
}
