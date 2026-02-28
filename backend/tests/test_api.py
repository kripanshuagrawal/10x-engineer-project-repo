"""API tests for PromptLab

These tests verify the API endpoints work correctly.
Students should expand these tests significantly in Week 3.
"""

import pytest
from fastapi.testclient import TestClient
from app.models import PromptUpdate
from app.api import app
from app.models import Prompt

client = TestClient(app)

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

# ============================================================================
# FIXTURES - Test Data Setup
# ============================================================================

    # Add missing fixtures for setup and teardown as needed
    @pytest.fixture(scope="module")
    def valid_prompt_data(self):
        """Fixture with valid prompt data."""
        return {
            "title": "Test Prompt",
            "content": "This is some test content."
        }

    @pytest.fixture(scope="module")
    def created_prompt(self):
        """Fixture to create and return a test prompt."""
        prompt_data = {
            "title": "Test Prompt",
            "content": "This is a test prompt content."
        }
        response = client.post('/prompts', json=prompt_data)
        assert response.status_code == 201
        return response.json()  # Returns created prompt, including the ID
    
# ============================================================================
# TEST: List Prompts Endpoint
# ============================================================================

    # Happy Path
    def test_list_prompts_all(self):
        """Test listing all prompts without any filtering."""
        response = client.get('/prompts')
        assert response.status_code == 200
        assert 'prompts' in response.json()
        assert isinstance(response.json()['prompts'], list)

    def test_list_prompts_with_valid_collection(self):
        """Test listing prompts with a valid existing collection."""
        # Create a collection first
        collection_data = {
            "name": "Test Collection",
            "description": "A test collection for prompts"
        }
        create_collection_response = client.post("/collections", json=collection_data)
        assert create_collection_response.status_code == 201
        created_collection_id = create_collection_response.json()["id"]

        # Once the collection is created, list prompts with this valid collection
        response = client.get(f'/prompts?collection_id={created_collection_id}')
        assert response.status_code == 200

    def test_list_prompts_with_valid_search(self):
        """Test listing prompts with a valid search query."""
        response = client.get('/prompts?search=test')
        assert response.status_code == 200

    # Error Cases
    def test_list_prompts_invalid_collection(self):
        """Test listing prompts with an invalid collection ID returns 400."""
        response = client.get('/prompts?collection_id=invalid')
        assert response.status_code == 400

    # Edge Cases
    def test_list_prompts_no_matches(self):
        """Test listing prompts with no matches in search results."""
        response = client.get('/prompts?search=no_match')
        assert response.status_code == 200
        assert len(response.json()['prompts']) == 0

    def test_list_prompts_no_prompts(self):
        """Test listing prompts when there are no prompts available."""
        # This requires an initial condition where the database is empty.
        response = client.get('/prompts')
        assert response.status_code == 200
        assert len(response.json()['prompts']) == 0

    def test_list_prompts_with_special_characters_in_search(self):
        """Test listing prompts with special characters in search query."""
        response = client.get('/prompts?search=%!@#%')
        assert response.status_code == 200

    # Query Parameter Tests
    def test_list_prompts_combined_filters(self):
        """Test listing prompts with both collection filter and search query."""
        # Create a collection first
        collection_data = {
            "name": "Combined Filter Collection",
            "description": "For testing combined filters"
        }
        create_collection_response = client.post("/collections", json=collection_data)
        assert create_collection_response.status_code == 201
        created_collection_id = create_collection_response.json()["id"]

        # Once the collection is created, test combined filters
        response = client.get(f'/prompts?collection_id={created_collection_id}&search=query')
        assert response.status_code == 200

    def test_list_prompts_invalid_collection_id_format(self):
        """Test listing prompts with invalid collection ID format."""
        response = client.get('/prompts?collection_id=12345')
        assert response.status_code == 400  # Assuming validation checks on UUID
# ============================================================================
    # TEST: Retrieve Prompt by ID
    # ============================================================================
    
    def test_get_prompt_valid_id(self, created_prompt):
        """Test retrieving prompt with a valid ID."""
        prompt_id = created_prompt['id']
        response = client.get(f'/prompts/{prompt_id}')
        assert response.status_code == 200
        assert response.json()['title'] == created_prompt['title']

    def test_get_prompt_invalid_id_format(self):
        """Test retrieving a prompt with an invalid ID format returns 400."""
        response = client.get('/prompts/invalid-format')
        assert response.status_code == 404

    def test_get_prompt_nonexistent_id(self):
        """Test retrieving a non-existent prompt ID returns 404."""
        response = client.get('/prompts/00000000-0000-0000-0000-000000000000')
        assert response.status_code == 404
    
    def test_get_prompt_valid_id(self, created_prompt):
        """Test retrieving a prompt with a valid ID."""
        prompt_id = created_prompt['id']
        response = client.get(f'/prompts/{prompt_id}')
        assert response.status_code == 200
        assert response.json()['title'] == created_prompt['title']

    def test_get_prompt_invalid_id_format(self):
        """Test retrieving a prompt with an invalid ID format returns 404."""
        response = client.get('/prompts/invalid-format')
        assert response.status_code == 404

    def test_get_prompt_malformed_id(self):
        """Test retrieving a prompt with a malformed ID returns 400."""
        response = client.get('/prompts/!@#%-id')
        assert response.status_code == 400
        assert 'Malformed prompt ID' in response.json().get('detail', '')

    def test_get_prompt_excessively_long_id(self):
        """Test retrieving a prompt with an excessively long ID returns 400."""
        long_id = 'a' * 1000  # Assume 1000 chars is excessively long
        response = client.get(f'/prompts/{long_id}')
        assert response.status_code == 400
        assert 'Invalid ID format' in response.json().get('detail', '')
    
    # ============================================================================
    # TEST: Create Prompt
    # ============================================================================

    def test_create_prompt_valid_data(self, valid_prompt_data):
        """Test creating a prompt with valid data returns 201."""
        response = client.post('/prompts', json=valid_prompt_data)
        assert response.status_code == 201
        assert 'id' in response.json(), "Response missing prompt ID"

    def test_create_prompt_missing_fields(self):
        """Test creating a prompt with missing fields returns 422."""
        response = client.post('/prompts', json={"title": "Only Title"})
        assert response.status_code == 422

    def test_create_prompt_empty_payload(self):
        """Test posting an empty JSON returns 422."""
        response = client.post('/prompts', json={})
        assert response.status_code == 422
    
    def test_create_prompt_with_long_title_and_content(self):
        """Test creating a prompt with excessively long title and content."""
        long_title = 'a' * 256
        long_content = 'b' * 1024  # Assuming these lengths are excessive
        response = client.post('/prompts', json={"title": long_title, "content": long_content})
        assert response.status_code == 422  # Assuming validation fails for long input

    def test_create_prompt_with_special_characters(self):
        """Test creating a prompt with special characters in title and content."""
        special_title = "!@#%^&*()_+=-[]{}|;:'<>,.?/~`"
        special_content = "Content!@#%^&*()"
        response = client.post('/prompts', json={"title": special_title, "content": special_content})
        assert response.status_code == 201
        assert response.json()['title'] == special_title

    def test_create_prompt_with_duplicate_title(self):
        """Test creating a prompt with a duplicate title."""
        # Assuming titles should be unique within a collection or system
        prompt_data = {"title": "Duplicate Title", "content": "Content for duplicate title."}
        client.post('/prompts', json=prompt_data)  # Create the initial prompt
        response = client.post('/prompts', json=prompt_data)  # Attempt to create a duplicate
        assert response.status_code == 409  # Assuming 409 Conflict for duplicates
    
    # ============================================================================
    # TEST: Update Prompt
    # ============================================================================

    def test_update_prompt_valid_data(self, created_prompt):
        """Test updating a prompt with valid data returns 200."""
        prompt_id = created_prompt['id']
        update_data = {"title": "Updated Title", "content": "Updated content"}
        response = client.put(f'/prompts/{prompt_id}', json=update_data)
        assert response.status_code == 200
        updated_prompt = response.json()
        assert updated_prompt['title'] == "Updated Title"

    def test_update_prompt_nonexistent_id(self):
        """Test updating a non-existent prompt returns 404."""
        response = client.put('/prompts/00000000-0000-0000-0000-000000000000', json={"title": "Update", "content": "Updated Content"})
        assert response.status_code == 404

    # ============================================================================
    # TEST: Delete Prompt
    # ============================================================================

    def test_delete_prompt(self, created_prompt):
        """Test deleting an existing prompt."""
        prompt_id = created_prompt['id']
        response = client.delete(f'/prompts/{prompt_id}')
        assert response.status_code == 204

        # Verify prompt is deleted
        response = client.get(f'/prompts/{prompt_id}')
        assert response.status_code == 404

    def test_delete_prompt_nonexistent_id(self):
        """Test deleting a non-existent prompt returns 404."""
        response = client.delete('/prompts/00000000-0000-0000-0000-000000000000')
        assert response.status_code == 404