"""API tests for PromptLab

These tests verify the API endpoints work correctly.
Students should expand these tests significantly in Week 3.
"""

import pytest
from fastapi.testclient import TestClient
from app.models import PromptUpdate
from app.SQLLiteStorage import SQLiteStorage
from app.api import app

# Use an in-memory SQLite database for each test
@pytest.fixture(scope="session")
def db():
    """Provide an in-memory database for the test session."""
    db_instance = SQLiteStorage(db_path=":memory:")
    yield db_instance
    db_instance.connection.close()

@pytest.fixture(autouse=True, scope="function")
def clear_storage(db):
    """Clear storage before each test."""
    db._create_tables()  # Ensure tables exist for each test

    db.execute("DELETE FROM prompts")
    db.execute("DELETE FROM collections")
    db.connection.commit()  # Ensure changes are committed
    yield
    

@pytest.fixture(scope="session")
def client(db):
    """Create a test client for the API."""
    # Override the app storage layer with the in-memory test instance
    app.state.db = db
    return TestClient(app)

class TestHealth:
    """Tests for health endpoint."""
    
    def test_health_check(self, client: TestClient):
        response = client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "version" in data


class TestPrompts:
    """Tests for prompt endpoints."""
    
    def test_create_prompt(self, client: TestClient, sample_prompt_data):
        response = client.post("/prompts", json=sample_prompt_data)
        assert response.status_code == 201
        data = response.json()
        assert data["title"] == sample_prompt_data["title"]
        assert data["content"] == sample_prompt_data["content"]
        assert "id" in data
        assert "created_at" in data
    
    def test_get_prompt_success(self, client: TestClient, sample_prompt_data):
        # Create a prompt first
        create_response = client.post("/prompts", json=sample_prompt_data)
        prompt_id = create_response.json()["id"]
        
        response = client.get(f"/prompts/{prompt_id}")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == prompt_id
    
    def test_get_prompt_not_found(self, client: TestClient):
        """Test that getting a non-existent prompt returns 404.
        
        NOTE: This test currently FAILS due to Bug #1!
        The API returns 500 instead of 404.
        """
        response = client.get("/prompts/nonexistent-id")
        # This should be 404, but there's a bug...
        assert response.status_code == 404  # Will fail until bug is fixed
    
    def test_delete_prompt(self, client: TestClient, sample_prompt_data):
        # Create a prompt first
        create_response = client.post("/prompts", json=sample_prompt_data)
        prompt_id = create_response.json()["id"]
        
        # Delete it
        response = client.delete(f"/prompts/{prompt_id}")
        assert response.status_code == 204
        
        # Verify it's gone
        get_response = client.get(f"/prompts/{prompt_id}")
        # Note: This might fail due to Bug #1
        assert get_response.status_code in [404, 500]  # 404 after fix
    
    def test_update_prompt(self, client: TestClient, sample_prompt_data):
        # Create a prompt first
        create_response = client.post("/prompts", json=sample_prompt_data)
        prompt_id = create_response.json()["id"]
        original_updated_at = create_response.json()["updated_at"]
        
        # Update it
        updated_data = {
            "title": "Updated Title",
            "content": "Updated content for the prompt",
            "description": "Updated description"
        }
        
        import time
        time.sleep(0.1)  # Small delay to ensure timestamp would change
        
        response = client.put(f"/prompts/{prompt_id}", json=updated_data)
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "Updated Title"
        
        # NOTE: This assertion will fail due to Bug #2!
        # The updated_at should be different from original
        # assert data["updated_at"] != original_updated_at  # Uncomment after fix
    
    def test_sorting_order(self, client: TestClient):
        """Test that prompts are sorted newest first.
        
        NOTE: This test might fail due to Bug #3!
        """
        import time
        
        # Create prompts with delay
        prompt1 = {"title": "First", "content": "First prompt content"}
        prompt2 = {"title": "Second", "content": "Second prompt content"}
        
        client.post("/prompts", json=prompt1)
        time.sleep(0.1)
        client.post("/prompts", json=prompt2)
        
        response = client.get("/prompts")
        prompts = response.json()["prompts"]
        
        # Newest (Second) should be first
        assert prompts[0]["title"] == "Second"  # Will fail until Bug #3 fixed


class TestCollections:
    """Tests for collection endpoints."""
    
    def test_create_collection(self, client: TestClient, sample_collection_data):
        response = client.post("/collections", json=sample_collection_data)
        assert response.status_code == 201
        data = response.json()
        assert data["name"] == sample_collection_data["name"]
        assert "id" in data
    
    def test_get_collection_not_found(self, client: TestClient):
        response = client.get("/collections/nonexistent-id")
        assert response.status_code == 404

    def test_patch_prompt_partial_update(self, client: TestClient, sample_prompt_data):
        # Create a prompt first
        create_response = client.post("/prompts", json=sample_prompt_data)
        prompt_id = create_response.json()["id"]
        original_updated_at = create_response.json()["updated_at"]

        # Prepare a PATCH request with partial data using PromptUpdate model
        # Assuming 'content' needs to be set or validated similarly
        patch_data = PromptUpdate(title="Updated Title", content=sample_prompt_data['content'])
        response = client.patch(f"/prompts/{prompt_id}", json=patch_data.dict(exclude_unset=True))
        assert response.status_code == 200

        updated_prompt = response.json()
        assert updated_prompt['title'] == "Updated Title"
        assert updated_prompt['content'] == sample_prompt_data['content']  # Unchanged as it's passed as the same
        assert updated_prompt['updated_at'] != original_updated_at  # Timestamp updates

    def test_patch_prompt_non_existing(self, client: TestClient):
        # Attempt to PATCH a non-existing prompt with both required fields
        patch_data = PromptUpdate(title="Should Fail", content="Content for non-existing")
        response = client.patch("/prompts/non_existing_id", json=patch_data.dict(exclude_unset=True))
        assert response.status_code == 404