# Frontend Tasks for Prompts and Collections Management

## Project Structure
- **Create a modular folder structure:**
  - **src/**
    - **components/**: All reusable UI components
    - **pages/**: Page components corresponding to different routes
    - **services/**: API call logic and integration (e.g., Axios instances)
    - **hooks/**: Custom React hooks for shared logic
    - **contexts/**: Context providers for state management
    - **styles/**: Shared styles or theme configuration
    - **utils/**: Helper functions and utilities

## API Integration
- **Set up Axios instance:**
  - Configure Axios to handle API requests and responses.
  - Set the base URL for the API and implement response interceptors.

## Prompts Management
- **Components:**
  - **PromptList**: Display list of prompts with options to filter by collection and search.
  - **PromptItem**: Individual prompt component with versioning details and actions.
  - **PromptDetail**: Detailed view of a single prompt including version history.
  - **PromptEditor**: Form component to create and edit prompts.

- **Pages:**
  - **PromptsPage**: Main page to handle list and management of prompts.
  - **PromptDetailPage**: Page for viewing detailed prompt information and edits.

- **Functionality:**
  - Fetch all prompts and filter by collection/search in **PromptList**.
  - Implement create, update, and delete operations for prompts in **PromptEditor**.
  - Handle versioning actions (create, view, revert) in **PromptDetail**.

## Collections Management
- **Components:**
  - **CollectionList**: Display list of collections.
  - **CollectionItem**: Individual collection component with action buttons.
  - **CollectionEditor**: Form component to create and edit collections.

- **Pages:**
  - **CollectionsPage**: Main page to handle list and management of collections.

- **Functionality:**
  - Fetch and display all collections in **CollectionList**.
  - Implement create, update, and delete operations for collections in **CollectionEditor**.

## Hooks and Contexts
- **Hooks:**
  - **usePrompts**: Custom hook for managing prompts state and actions.
  - **useCollections**: Custom hook for managing collections state and actions.
  - **useVersions**: Hook for handling version-related logic in prompts.

- **Contexts:**
  - **PromptContext**: Context provider for prompts state across components.
  - **CollectionContext**: Context provider for collections state.

## Styling
- Implement shared styles and theming using a CSS-in-JS solution like styled-components or TailwindCSS.
- Ensure all components are responsive and conform to the chosen design system.

## Testing
- Write unit tests for components and pages using Jest and React Testing Library.
- Test API integration logic in services using mocking libraries like msw.

## Final Integration
- Set up routing using React Router to navigate between prompts and collections pages.
- Ensure all components are wired up and functional with state managed through Context API or a similar state management tool.

## Documentation
- Document key components and API integration logic for future reference.
