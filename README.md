# EduCorner-ReactNative

``` bash
*Description about ReactNative application:*

    * Main use of this application is to teachers(admin) assigning homework to students(users)
    
    * Here I'm using realtime firebase database for data maintenance
    
    * Initially application starts from Splash screen
        1. If internet is turned-off -> displays No-internet message and shows Try-again option
        2. Else it fetches all homeworks datas from database from splash screen
        3. shows loading progress till data retrieval
        4. After data retrieval it redirects to Login screen
        
    * From Login screen -> contains totally two modules:
        1. ADMIN
        2. USER
          
    * ADMIN(Update, Delete):
        UPDATE:
        1. Admin contains fixed privileges for authentication
        2. Admin can assign homeworks in the basis of date, subject, message
        3. After update it will directly update in database
        4. Students(user) can view the added homework
        
        DELETE:
        1. Admin can delete particular homework
        2. Students(user) can view the deleted homework
        
   * USER(Signup, Login, ViewHomeWork, ViewProfile, Logout):
        SIGNUP:
           1. User can create new account in signup module
           2. Created user information stored in database
           
        LOGIN:
           1. Checks the user available in existing record of database
           2. If exists -> redirects to viewHomework page
           3. If not exists -> Show Invalid login
           
        ViewHomeWork:
           1. After login success, it shows list of available homeworks from database
           2. Contains drawerNavigator to redirect inner screens
           
        ViewProfile:
           1. Shows logged in user information
           
        Logout:
           1. Logout the particular user from the application
```

## Steps for ReactNative Setup

``` bash
# Start application by installing dependencies
   * > react-native init <Project-name>

# Create local.properties folder inside android folder:
   * This is created to set SDK path to the project
   * SDK path in this file: sdk.dir = "C:\\Users\\<SystemName>\\AppData\\Local\\Android\\sdk"

# To connect Mobile with React Native project:
   * Go to this path: C:\Users\<SystemName>\AppData\Local\Android\Sdk\platform-tools
   * C:\Users\<SystemName>\AppData\Local\Android\Sdk\platform-tools>adb devices
   * Shows List of devices attached
   * >adb -s <deviceName> reverse tcp:8081 tcp:8081

# Run project:
   * >react-native run-android

```


  ***SCREENSHOTS***
  
1. Splash screen loading:
<img src="https://user-images.githubusercontent.com/19771986/50154283-f35de600-02ee-11e9-8191-2ee13c5bd88e.png" width="100" height="200" />


2. If Internet not exists:
![screenshot_2018-12-17-14-43-39-483_com test](https://user-images.githubusercontent.com/19771986/50154317-083a7980-02ef-11e9-8d93-506578c1d7d8.png)

3. Login screen:
![screenshot_2018-12-17-14-43-17-702_com test](https://user-images.githubusercontent.com/19771986/50154348-1f796700-02ef-11e9-83df-568cb1b1fa69.png)

4. Signup Screen to create new account:
![screenshot_2018-12-17-14-49-17-905_com test](https://user-images.githubusercontent.com/19771986/50154444-56e81380-02ef-11e9-84e7-9c62aa13c657.png)
![screenshot_2018-12-17-14-52-25-757_com test](https://user-images.githubusercontent.com/19771986/50154452-5b143100-02ef-11e9-9dfa-010c33f1aa95.png)

5. Invalig login action:
![screenshot_2018-12-17-14-53-09-557_com test](https://user-images.githubusercontent.com/19771986/50154471-6e270100-02ef-11e9-9a35-a160249abe6c.png)

6. Shows list of homeworks after login success:
![screenshot_2018-12-17-18-38-02-820_com test](https://user-images.githubusercontent.com/19771986/50154534-9e6e9f80-02ef-11e9-81a7-c46d7b1fa842.png)

7. DrawerNavigator view for page redirection:
![screenshot_2018-12-17-18-38-10-680_com test](https://user-images.githubusercontent.com/19771986/50154563-b34b3300-02ef-11e9-8c6b-640332b8a6ce.png)

8. Profile screen for user information:
![screenshot_2018-12-17-14-55-05-033_com test](https://user-images.githubusercontent.com/19771986/50154632-e1c90e00-02ef-11e9-8292-5e7f8def01cc.png)

9. Admin fixed privelege for admin login:
![screenshot_2018-12-17-14-56-18-038_com test](https://user-images.githubusercontent.com/19771986/50154659-f9a09200-02ef-11e9-96ee-7b903a71672d.png)

10. Admin can update Date, subject, Description:
![screenshot_2018-12-17-14-58-50-240_com test](https://user-images.githubusercontent.com/19771986/50154737-3a98a680-02f0-11e9-8ddd-44c0faf2d2aa.png)

11. Validation also done:
![screenshot_2018-12-17-15-01-14-789_com test](https://user-images.githubusercontent.com/19771986/50154844-8b100400-02f0-11e9-92da-1141730cb828.png)

12. Admin Date selection:
![screenshot_2018-12-17-14-58-41-294_com test](https://user-images.githubusercontent.com/19771986/50154752-4b491c80-02f0-11e9-8292-7aa522378db7.png)

13. Admin Subject selection;
![screenshot_2018-12-17-14-59-02-279_com test](https://user-images.githubusercontent.com/19771986/50154776-5ac86580-02f0-11e9-8f9a-327bf73074dd.png)

13. After data provided:
![screenshot_2018-12-17-15-00-08-052_com test](https://user-images.githubusercontent.com/19771986/50154906-a713a580-02f0-11e9-900d-6d81ab91d268.png)
![screenshot_2018-12-17-15-13-51-209_com test](https://user-images.githubusercontent.com/19771986/50154913-ab3fc300-02f0-11e9-90a6-9537411d6bd1.png)

14. Admin Delete homework
![screenshot_2018-12-17-15-40-13-538_com test](https://user-images.githubusercontent.com/19771986/50154985-dcb88e80-02f0-11e9-94e3-8c99bdd3f28f.png)
![screenshot_2018-12-17-15-42-58-299_com test](https://user-images.githubusercontent.com/19771986/50154993-e17d4280-02f0-11e9-9b65-0ce911e1ee8a.png)
![screenshot_2018-12-17-18-35-21-298_com test](https://user-images.githubusercontent.com/19771986/50154994-e3df9c80-02f0-11e9-999c-1cb6f5c3db76.png)

