# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
To get your code up and running on your own system, follow these steps:

1. **Installation process**:
    ```bash
    yarn install
    ```

2. **Running the development server**:
    ```bash
    yarn dev
    ```

3. **Building the project**:
    ```bash
    yarn build
    ```

4. **Modifying CSS**:
    - The CSS files can be modified in the `src/scss` folder.
    - To compile the SCSS files, run:
      ```bash
      yarn sass
      ```
5. **Update assistant endpoint**:
    ```
    In the file “src/services/httpService_Copilot.tsx”, modify the value of the variable “baseURL”.
    ```
6. **Create a Docker Container and upload the Image to an ACR**:
    ```
    In Bash -> run the file “build_and_push_ACR.sh”
    ```
    ```
    In PowerShell -> run the file “build_and_push_ACR.ps1”
    ```