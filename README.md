# Django DRF Project - AI 지식인 서비스
  * 질문을 하면 ChatGPT가 답변을 해주는 서비스 입니다.
  * 내가 한 질문과 ChatGPT의 답변이 게시물로 생성됩니다.
  * 다른 사람들의 질문들을 볼 수 있습니다.
    
## 1. 목표와 기능
  1.1 목표
   * DRF(Django REST Framework)를 이용한 REST API 구현
   * ViewSet을 사용해서 CRUD 기능 설계
   * Accounts(Login, Logout) 인증 방식 JWT 사용
   * ChatGPT API 사용
   * AWS에 서버 배포
   * HTML + Vanilla JS로 간단한 Front-End 구현
   * Netlify로 FE 배포

  1.2 기능
   * 회원가입 혹은 로그인 후, 글쓰기를 통해 카테고리를 선택하여 질문을 할 수 있습니다.
   * 내가 한 질문과 ChatGPT의 답변이 게시물로 생성됩니다.
   * 메인화면에서 모든 질문들을 볼 수 있습니다.
   * 상세 게시물에서 조회수와 추천수를 확인 할 수 있습니다.
   * 게시물에 추천을 누르거나 댓글을 작성할 수 있습니다.

## 2. Stacks 및 배포 URL

  ### 2.1 Stacks
  
  * Enviroment

    ![VSC](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
    ![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
    ![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)

 

  * Development


    ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
    ![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
    ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
    ![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
 


  * DataBase
    
    ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)


  ### 2.2 배포 URL
   
   [https://stupendous-elf-84bccd.netlify.app/](https://stupendous-elf-84bccd.netlify.app/)

    - test ID : test
    - test PW : mypw1234

## 3. 아키텍처/URL 구조 및 플로우 차트

  ### 3.1 아키텍처 구조
  <img width="512" alt="image" src="https://github.com/UserDongHu/ChatGPT_DRF_Project/assets/137512514/878a3cbf-5e6b-4412-9d7a-f16393a6e09c">


### 3.2 URL 구조

Swagger link : [http://52.78.33.155:8000/api/schema/swagger-ui/](http://52.78.33.155:8000/api/schema/swagger-ui/)
<br></br>

- accounts

| App       | Method        | URL                               | Views Class        | Note           |
|-----------|---------------|-----------------------------------|------------------- |----------------|
| accounts  | POST   | '/accounts/join/'                         |   -                 |회원가입  |
| accounts  | POST   | '/accounts/login/'                         |   -                 |로그인  |
| accounts  | POST   | '/accounts/logout/'                         |   -                 |로그아웃 |
| accounts  | GET   | '/accounts/profile/'                         |   ProfileViewSet       |내 프로필  |

- blog

| App       | Method        | URL                               | Views Class        | Note           |
|-----------|---------------|-----------------------------------|------------------- |----------------|
| blog  | GET   | '/blog/posts/'                         |   PostViewSet                 |게시글 목록 |
| blog  | POST   | '/blog/posts/'                       |   PostViewSet                 |게시글 생성  |
| blog  | GET   | '/blog/posts/{post_id}/'                |    PostViewSet       |게시글 상세보기 / 게시글 조회수 증가 |
| blog  | PATCH   | '/blog/posts/{post_id}/'                  |   ProfileViewSet    |게시글 수정 |
| blog  | DELETE   | '/blog/posts/{post_id}/'                   |   ProfileViewSet    |게시글 삭제 |
| blog  | POST   | '/blog/posts/{post_id}/like/'                   |   ProfileViewSet    |게시글 좋아요 증가|
| blog  | GET   | '/blog/posts/{post_id}/comments/'                   |   CommentViewSet    | 게시물의 댓글 목록 |
| blog  | POST   | '/blog/posts/{post_id}/comments/'                   |   CommentViewSet    | 게시물의 댓글 생성 |
| blog  | GET   | '/blog/posts/{post_id}/comments/{comment_id}/'       |   CommentViewSet    | 게시물의 특정 댓글 보기 |
| blog  | PATCH   | '/blog/posts/{post_id}/comments/{comment_id}/'       |   CommentViewSet    | 게시물의 특정 댓글 수정 |
| blog  | DELETE   | '/blog/posts/{post_id}/comments/{comment_id}/'       |   CommentViewSet    | 게시물의 특정 댓글 삭제 |



### 3.3 플로우 차트

메인페이지

<img width="672" alt="image" src="https://github.com/UserDongHu/ChatGPT_DRF_Project/assets/137512514/76257eef-e2e7-4479-932f-b0ecc0069876">

게시글 상세보기

<img width="999" alt="image" src="https://github.com/UserDongHu/ChatGPT_DRF_Project/assets/137512514/0b677c41-e2fb-42a2-9cdd-a1dfa0e1e3df">


## 4. 디렉토리 구조와 개발일정(WBS)

### 4.1 디렉토리 구조
```
├── 📂FE
│   ├── js
│   │   ├── accounts
│   │   │   ├── accounts-join.js
│   │   │   ├── accounts-login.js
│   │   │   ├── accounts-logout.js
│   │   │   └── accounts-profile.js
│   │   └── blog
│   │       ├── blog-create.js
│   │       └── blog-main.js
│   └── templates
│       ├── accounts
│       │   ├── join.html
│       │   ├── login.html
│       │   ├── logout.html
│       │   └── profile.html
│       └── blog
│           ├── create.html
│           └── index.html
├── README.md
├── 📂accounts
│   ├── __init__.py
│   ├── __pycache__
│   ├── admin.py
│   ├── apps.py
│   ├── managers.py
│   ├── migrations
│   ├── models.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── 📂blog
│   ├── __init__.py
│   ├── __pycache__
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   ├── __init__.py
│   │   └── __pycache__
│   ├── models.py
│   ├── permissions.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── db.sqlite3
├── manage.py
├── media
├── 📂project
│   ├── __init__.py
│   ├── __pycache__
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── requirements.txt
└── static
```

### 4.2 개발일정(WBS)
```mermaid
gantt
    title ChatGPT DRF Project
    dateFormat  YYYY-MM-DD
    section 기획
        레포지토리 생성 :2023-11-21, 1d
        주제 선정 :2023-11-21, 2d
        WBS :2023-11-22, 1d
        화면 설계 :2023-11-22, 1d
        플로우 차트 설계 :2023-11-22, 2d
        URL 설계 :2023-11-23, 1d
        Model 설계 :2023-11-23, 2d

    section BE 구현
        로그인/로그아웃 :2023-11-23, 1d
        회원가입 :2023-11-23, 1d
        프로필 페이지 : 2023-11-23, 1d
        JWT 인증 :2023-11-23, 2d
        게시물 상세/조회수 :2023-11-24, 1d
        게시물 CRUD :2023-11-24, 1d
        댓글 CRUD :2023-11-24, 1d
        ChatGPT API 연결 :2023-11-24, 1d
        AWS EC2 배포 :2023-11-24, 2d
        Swagger :2023-11-25, 1d
        
    section FE 구현
        로그인/로그아웃 :2023-11-27, 1d
        회원가입 :2023-11-27, 1d
        프로필 페이지 : 2023-11-27, 1d
        JWT 인증 :2023-11-27, 2d
        게시물 상세 :2023-11-28, 1d
        게시글 CRUD :2023-11-28, 1d
        댓글 CRUD :2023-11-28, 2d
        Netlify 배포 :2023-11-29, 1d
```

## 5. ERD 

<img width="769" alt="image" src="https://github.com/UserDongHu/ChatGPT_DRF_Project/assets/137512514/47abefcd-aa6c-4185-ad78-8cd490a834ba">




## 6. UI 

* 로그인/로그아웃
![로그인로그아웃](https://github.com/UserDongHu/ChatGPT_DRF_Project/assets/137512514/4eac7954-6b70-47f0-8abc-bee470fb0740)


* 회원가입
![회원가입](https://github.com/UserDongHu/ChatGPT_DRF_Project/assets/137512514/f3664588-04a7-4640-9d6d-46d5d27219b7)



* 프로필
![프로필](https://github.com/UserDongHu/ChatGPT_DRF_Project/assets/137512514/9a3fd915-9e89-4ade-b390-38849252891a)



* 글쓰기
![글쓰기](https://github.com/UserDongHu/ChatGPT_DRF_Project/assets/137512514/c9ad1032-c951-40e6-885e-b4e45208d16d)



* 좋아요/댓글작성
![좋아요 댓글작성](https://github.com/UserDongHu/ChatGPT_DRF_Project/assets/137512514/cbff4d10-f2f8-40d7-870e-6678b99de5d2)



* 댓글 삭제
![댓글삭제](https://github.com/UserDongHu/ChatGPT_DRF_Project/assets/137512514/254ea181-9789-4682-bd09-93d235a53d42)



* 게시글 삭제
![게시글 삭제](https://github.com/UserDongHu/ChatGPT_DRF_Project/assets/137512514/8ceb1c6c-a3e7-4a7c-960c-405fb9b62e2d)





## 7. 에러와 에러 해결
