# Clawk.js
**Clawk.js** is a **JavaScript** rewritten version of the Clawk project, originally developed by Haitham Aouati.
This project allows you to extract public information from TikTok profiles, such as follower count, videos, likes, and other statistics, using only the username.

---

## 🚀 Installation

To install Clawk.js via npm:
```bash
npm install clawk.js
```

## 🔧 Usage

You can use Clawk.js in two ways: as a module in your JavaScript code or directly via the CLI.

### 📦 As a JS module

JavaScript

```
import { getUserInfo } from 'clawk.js';

async function fetchUserInfo(username) {
  try {
    const userInfo = await getUserInfo(username);
    console.log(userInfo);
  } catch (error) {
    console.error('Error fetching user information:', error);
  }
}

fetchUserInfo('username_to_fetch');

```
## 👩🏻‍💻 Via CLI
```
npx clawk.js username
```
----------

Both methods return the profile's public information, including:

-   User ID    
-   Username (uniqueId)    
-   Nickname    
-   Signature / biography    
-   Follower, video, and like counts    
-   Avatar URLs    
-   Verification, private account status, etc.    

Replace `'username'` with the desired TikTok username.

## 📚 Contributing

Contributions are welcome!

To contribute:
1.  Fork this repository.    
2.  Create a new branch: `git checkout -b my-new-feature`    
3.  Make your changes and commit: `git commit -am 'Adds new feature'`    
4.  Push to the branch: `git push origin my-new-feature`    
5.  Open a Pull Request.
----------
## ⚡ Credits

-   Original Project: [Clawk.sh by Haitham Aouati](https://github.com/haithamaouati/Clawk)
    
-   This version: **Clawk.js** – JavaScript port by Davidson N. Fahel
    

## 📄 License
This project is licensed under the [WTFPL license](https://github.com/ofahel/clawk.js/blob/main/LICENSE).
