use std::process::Child;
use std::sync::{Arc, Mutex};

pub struct AppState {
    pub minecraft_process: Mutex<Option<Child>>,
}

impl AppState {
    pub fn new() -> Arc<Self> {
        Arc::new(Self {
            minecraft_process: Mutex::new(None),
        })
    }
}
