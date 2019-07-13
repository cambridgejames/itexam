# ITEXAM作业系统 规格说明
---

```
 ___  _________  _______      ___    ___ ________  _____ ______      
|\  \|\___   ___\\  ___ \    |\  \  /  /|\   __  \|\   _ \  _   \    
\ \  \|___ \  \_\ \   __/|   \ \  \/  / | \  \|\  \ \  \\\__\ \  \   
 \ \  \   \ \  \ \ \  \_|/__  \ \    / / \ \   __  \ \  \\|__| \  \  
  \ \  \   \ \  \ \ \  \_|\ \  /     \/   \ \  \ \  \ \  \    \ \  \ 
   \ \__\   \ \__\ \ \_______\/  /\   \    \ \__\ \__\ \__\    \ \__\
    \|__|    \|__|  \|_______/__/ /\ __\    \|__|\|__|\|__|     \|__|
                             |__|/ \|__|                             

```

### 系统用途
---

### 用户及用户组
---
1. 超级用户administrator拥有绝对权限，可以编辑任何资源
2. 管理员用户（一般为教师）可以编辑具有权限的资源
3. 管理员用户可以创建二级用户，但二级用户的权限应该为所属管理员用户的真子集
4. 二级用户没有二级密码
5. 只有拥有班级的教师用户可以在班级中发布公告

