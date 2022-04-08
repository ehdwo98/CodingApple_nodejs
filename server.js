const express = require('express');//express첨부
const MongoClient = require('mongodb').MongoClient;
const app =express();//객체 생성

app.use(express.urlencoded({extended: true}))//body-paser사용
app.set('view engine', 'ejs');//ejs -> 서버데이터를 HTML에 넣어주는 렌더링 엔진

var db;
MongoClient.connect('mongodb+srv://ehdwo98:ehdwo2991@cluster0.btzh8.mongodb.net/todoapp?retryWrites=true&w=majority', { useUnifiedTopology: true }, function(에러, client){
    if (에러) return console.log(에러);
    db=client.db('todoapp');

    db.collection('post').insertOne({이름 : 'John', _id:100}, function(에러, 결과){
        console.log('저장완료');
    });

    app.listen('8080', function(){
      console.log('listening on 8080')
    });
})
app.post('/add', function(요청, 응답){
    응답.send('전송완료');
    db.collection('post').insertOne({제목 : 요청.body.title, 날짜 : 요청.body.date }, function(에러, 결과){
        console.log('저장완료');
    });
});

//누군가가 /beauty로 방문을 하면 안내문을 뜨워주자
app.get('/beauty',function(req, res){
    res.send('뷰티용품 쇼핑 페이지입니다.');
});

app.get('/',function(req, res){// /하나만 쓰면 홈
    res.sendFile(__dirname+'/index.html')
});

app.get('/write',function(req, res){// /하나만 쓰면 홈
    res.sendFile(__dirname+'/write.html')
});
