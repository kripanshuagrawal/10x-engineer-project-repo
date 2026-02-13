"""Test fixtures for PromptLab"""

import pytest
from fastapi.testclient import TestClient
from app.api import app
from app.SQLLiteStorage import SQLiteStorage

# Use an in-memory SQLite database for each test
@pytest.fixture(scope="session")
def db():
    """Provide an in-memory database for the test session."""
    db_instance = SQLiteStorage(db_path=":memory:")
    yield db_instance
    db_instance.connection.close()

@pytest.fixture
def client(db):
    """Create a test client for the API."""
    # Attach the DB to the app - assume the API can handle this dynamically
    app.state.db = db
    return TestClient(app)

@pytest.fixture(autouse=True, scope="function")
def clear_storage(db):
    """Ensure clean state between tests."""
    # Ensure tables exist for each test
    db._create_tables()  # Assuming _create_tables is a method to initialize the database schema
    yield
    db.execute("DELETE FROM prompts")
    db.execute("DELETE FROM collections")
    db.connection.commit()

@pytest.fixture
def sample_prompt_data():
    """Sample prompt data for testing."""
    return {
        "title": "Code Review Prompt",
        "content": "Review the following code and provide feedback:\n\n{{code}}",
        "description": "A prompt for AI code review"
    }

@pytest.fixture
def sample_collection_data():
    """Sample collection data for testing."""
    return {
        "name": "Development",
        "description": "Prompts for development tasks"
    }


