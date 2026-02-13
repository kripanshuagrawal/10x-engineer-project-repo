import sqlite3
from app.models import Prompt, Collection
from typing import List, Optional
import pytest
from fastapi.testclient import TestClient

class SQLiteStorage:
    def __init__(self, db_path="database.db"):
        self.connection = sqlite3.connect(db_path, check_same_thread=False)
        self.connection.row_factory = sqlite3.Row
        self._create_tables()

    def _create_tables(self):
        with self.connection as con:
            con.execute("""
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
            con.execute("""
            CREATE TABLE IF NOT EXISTS collections (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL
            )
            """)

    def execute(self, query: str, params: tuple = ()):
        with self.connection as con:
            cur = con.cursor()
            cur.execute(query, params)
            con.commit()
            return cur

    # ===== Prompt Operations =====
    def create_prompt(self, prompt: Prompt) -> Prompt:
        query = """
        INSERT INTO prompts (id, title, content, description, collection_id, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """
        self.execute(query, (prompt.id, prompt.title, prompt.content,
                             prompt.description, prompt.collection_id, prompt.created_at, prompt.updated_at))
        return prompt

    def get_prompt(self, prompt_id: str) -> Optional[Prompt]:
        query = "SELECT * FROM prompts WHERE id = ?"
        cur = self.execute(query, (prompt_id,))
        row = cur.fetchone()
        return Prompt(**row) if row else None

    def get_all_prompts(self) -> List[Prompt]:
        query = "SELECT * FROM prompts"
        cur = self.execute(query)
        return [Prompt(**row) for row in cur.fetchall()]

    def update_prompt(self, prompt_id: str, prompt: Prompt) -> Optional[Prompt]:
        query = """
        UPDATE prompts SET title = ?, content = ?, description = ?, collection_id = ?, updated_at = ?
        WHERE id = ?
        """
        self.execute(query, (prompt.title, prompt.content, prompt.description,
                             prompt.collection_id, prompt.updated_at, prompt_id))
        return prompt

    def delete_prompt(self, prompt_id: str) -> bool:
        query = "DELETE FROM prompts WHERE id = ?"
        self.execute(query, (prompt_id,))
        return True

    # ===== Collection Operations =====
    def create_collection(self, collection: Collection) -> Collection:
        query = "INSERT INTO collections (id, name) VALUES (?, ?)"
        self.execute(query, (collection.id, collection.name))
        return collection

    def get_collection(self, collection_id: str) -> Optional[Collection]:
        query = "SELECT * FROM collections WHERE id = ?"
        cur = self.execute(query, (collection_id,))
        row = cur.fetchone()
        return Collection(**row) if row else None

    def get_all_collections(self) -> List[Collection]:
        query = "SELECT * FROM collections"
        cur = self.execute(query)
        return [Collection(**row) for row in cur.fetchall()]

    def delete_collection(self, collection_id: str) -> bool:
        query = "DELETE FROM collections WHERE id = ?"
        self.execute(query, (collection_id,))
        return True

    def get_prompts_by_collection(self, collection_id: str) -> List[Prompt]:
        query = "SELECT * FROM prompts WHERE collection_id = ?"
        cur = self.execute(query, (collection_id,))
        return [Prompt(**row) for row in cur.fetchall()]

# Create a global instance of SQLiteStorage
storage = SQLiteStorage()