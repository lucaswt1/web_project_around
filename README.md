# Around The U.S.

## Project Description and Functionality

Around The U.S. is an interactive social media platform where users can share photos of interesting places across the United States. The application allows users to view, like, add, and remove photo cards, as well as edit their profile information and avatar photo.

**Main Features:**

- View and interact with photo cards from different locations
- Like and unlike cards from other users
- Add new photo cards with custom images and descriptions
- Edit user profile (name and description)
- Update profile avatar photo
- Delete own photo cards with confirmation dialog
- Real-time synchronization with server API
- Responsive design for all device sizes

## Technologies and Techniques Used

**Frontend Technologies:**

- HTML5: Semantic structure with proper accessibility
- CSS3: Flexbox, Grid Layout, BEM methodology, media queries for responsive design
- JavaScript ES6+: Classes, modules, async/await, DOM manipulation

**Programming Techniques:**

- Object-Oriented Programming with ES6 classes
- API integration with fetch and Promise handling
- HTML5 form validation with ValidityState
- Event delegation and proper event handling
- Error handling and user feedback (loading states)

**Classes Implemented:**

- `Api`: Manages all HTTP requests to the server
- `Card`: Creates and manages individual photo cards
- `Section`: Renders lists of elements
- `Popup`: Base class for modal windows
- `PopupWithForm`: Form-based popups
- `PopupWithImage`: Image preview popup
- `PopupWithConfirmation`: Confirmation dialogs
- `UserInfo`: Manages user profile information
- `FormValidator`: Handles form validation
