import sqlite3

def initialize_db(db_path="database.db"):
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()

    # Create tables
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS prompts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        description TEXT,
        collection_id TEXT,
        created_at TEXT,
        updated_at TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS collections (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL
    )
    """)

    connection.commit()
    connection.close()

if __name__ == "__main__":
    initialize_db()