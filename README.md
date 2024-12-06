# todo-api ( express/ mongoose <> mongoDB) 💡

<aside>

**2024-11-01  !**

</aside>

## 주요 사용 라이브러리 및 익스텐션

[ mongoDB ](https://www.notion.so/1-mongoDB-134b853ac11a8064ad3befc68df86327?pvs=21)

[ mongoose ](https://www.notion.so/2-mongoose-134b853ac11a8095aec1c8c093418413?pvs=21)

[ nodemon ](https://www.notion.so/3-nodemon-134b853ac11a8087873bcd256e706fde?pvs=21)

[ REST Client ](https://www.notion.so/4-REST-Client-134b853ac11a80e2892bc59f638d5a24?pvs=21)










<aside>

</aside>

**💡개발공부 과정!**

## 1 express 로 라우트 생성.

express 로 라우트를 생성 ⇒ 여기서 라우트란 특정 ‘엔트포인트’를 담당하는 코드.

코드 예시) express 로 HTTP 메소드를 사용하는 기본적인 모습.

const app = express ();

```jsx
app.get(’/hello’ , (req ,res ) ⇒ { 
		 res.sed('Hi')
} 
app.listen(3000 , () => console.log('서버를 시작했습니다')

여기서 listen 함수는 서버의 3000번 포트를 가리키겠다? 듣고 있다 ? 정도로 이해하고
서버를 시작하면 콜백함수를 실행한다. 
```

### 서버로 데이터를 주고 받을때는 자바스크립트 객체형식을 json형식으로…

res.send() 메소드는 아규먼트로 JS 객체를 받으면 그것을 Json  형식으로 변환해서 전달한다.

반대로 서버에전달하는 상황이 아닌 받을때는 직접 파싱을 해야한다.

선언한 express 라우트 객체에 use(express.json( ) ) 함수를 사용하면 기본적으로 전달 받는 모든 데이터를

json ⇒ js 객체타입으로 변환해서 받는다.

## 쿼리스트링

쿼리스트링은 url 에서 ? 다음에 오는 부분이다.

보통 get 메소드를 데이터를 요청할때 데이터를 특정하거나 데이터를 분류할때 조건을 전달하는데

사용한다.

ex ) /hello?sort=oldest&count=3  이처럼 정렬과 받아올 데이터의 갯수등을 설정한다.

쿼리스트링은  req.qurey  객체의 key와 값이 된다.

ex ) req.qurey.sort , req.qurey.count 

이때 쿼리 파라미터는 무조건 문자열을 리턴한다.

count 처럼 무엇인가 숫자의 값이 필요하다면 Number () 를 활용해서 변수의 타입을 바꿔주자.

사용예시 코드 ⇒  

```
예시 호출 문.  sort = oldest count = 3
GET http://localhost:3000/tasks?sort=oldest&count=3
```

```jsx
const app = express();

app.use(express.json());

app.get('/tasks' , (req , res) => {
    
    const sort = req.query.sort;
    const count = Number(req.query.count);

    const compare = sort === 'oldest' ? (a , b) => a.createdAt - b.createdAt : (a , b) => b.createdAt - a.createdAt;
    let newTasks =   mockTasks.sort(compare);
    console.log(sort,count);
    if(count){
       newTasks =  newTasks.slice(0,count);
    }
    res.send(newTasks);
    })
```

### 다이나믹 URL

url 이 항상 일정하지않고 일부가 바뀌는 것을 의미한다.

예를들면 아이디 값으로 특정 데이터 한개를 조회 한다고 쳤을때 , ⇒ 

id 값마다  라우트를 정의 할 수 없으니 /hello/:id 이런식으로  포괄적으로 받는다.

**: id**  ( 이부분은  url   파라미터라고 부른다.)

다이나믹하게 바뀌는 부분은 /: 콜론다음에 표시한다.

기본적으로 url 파라미터도 문자열로 전달되기 때문에  Number 로 바꿔준다.

```jsx
ex) app.get(’/tasks/:id ‘ , ( req ,res ) ⇒ { 
const id = Number(req.params.id)
}
```

## mongoose schema(스키마) 정의 하기

데이터의 모양, 틀을 모델링을 하는 것이다. (데이터 필드정의 등등..)

몽구스를 임포트가  shema를 정의해준다. new mongoose.Schema( ) ;

함수의 첫 번째 인자로 데이터의 유형을 정의하고 

**두 번째 아규먼트에는 Schema option (스키마옵션) 이 들어간다.**

**다음코드에서 timestamps : true 는** 

**객체가 생성하는 시간(createdAt,updatedAt) 프로퍼티를 자동으로 생성 해준다.**

### Schema()

schema 함수는 ⇒ 다룰 객체의 틀을 정의

```jsx
import mongoose from 'mongoose'
const TaskSchema = new mongoose.Schema(
	{
		title: {
			type:String,
		},
		description: {
			type :String,
			defalut : false,
		},
	  isComplete : {
    type : Boolean,
    default : false,
	},
	{
	timestamps : true ,
	},
);

const Task = mongoose.model('Task' , TaskSchema);
```

### model  ( ) ;

model ( ) 은 schema  를 기반으로 객체를 생성하고 조회하고 수정하고 삭제할 수 있는 

인터페이스이다.

첫번째 아규먼트는 **첫문자를 대문자로 단수형으로** mongoDb에서 다룰 컬렉션이름을 결정 짓는다.

두 번째 아규먼트에는 미리 정의해둔 **schema 가 들어간다.**

## seed.js

데이터의 초기데이터를 넣는 과정을 시딩 , 시드데이터는 데이터베이스에서 사용 할 초기 데이터이다. 데이터베이스의 초기데이터가 들어갈 초기데이터가 있어야  api 가 제대로 작동하는지 

**확인하기 좋다.**

데이터 베이스에 연결하는 코드 

```jsx
mongoose.connect(DATABASE_URL);
```

몽구스의  api  는 거의 다음과 같은 모양이다. 

DB 의 값을 불러오고 쓰는 과정은 비동기로 처리해야 하기 때문에 await 문을 사용한다.

await Task.deleteMany( { } );  모델.함수 ~

**deleteMany( { } ) 함수는 삭제조건을 파라미터로 받으며 빈객체를 전달하면 모든 데이터가 삭제됨.**

**insertMany ( ) 는 삽입할 데이터를 파라미터로 받는다.**

데이터 베이스와의 커넥션 종료 ⇒ 

서버프로그램은 계속 실행된 상태로 띄워놓기 때문에 커넥션을 종료할 필요가없지만

이코드는 한번 쭉 실행되고 끝나는 프로그램이기 때문에 종료문을 작성해준다.

초기 세팅을 해주고 그 작업이 끝나면 종료해주는 느낌.

```jsx
import mongoose from "mongoose";
import data from './data/mock.js'
import Task from "./models/Task.js"
import { DATABASE_URL } from "./env.js";
mongoose.connect(DATABASE_URL);

await Task.deleteMany({});
await Task.insertMany(data);

mongoose.connection.close();
```

## 데이터 베이스에서 데이터 조회하기

**가장중요한 점! mongoose 에서는 조회할 필터조건을 연결해서 쓰고** 

**결과를 가져오려면 비동기 처리를 한다.**

데이터베이스에서 데이터를 불러오거나 읽는 작업은 비동기로 처리 ⇒ async , await

model 로 정의한 Task를 임포트하여 Task 를 통해 데이터를 생성 수정 제거 등을 한다.

**Task.findById(Id) ⇒ model.findById 는 쿼리를 리턴한다.**

쿼리는 promise 와 비슷하다. ⇒ 쿼리도 똑같이 작동한다 .

조회 작업이 완료되면 조회한 데이터를 결과값으로 받게되고 await 으로 결과값을 받아올 수 있다.

차이점은 쿼리는 쿼리뒤에 조회 조건을 나열해서 사용 할 수 있다.

```jsx
const tasks = await Task.find().sort(sortOption).limit(count);
```

다음코드는 mongoose 에서 제공하는 함수로 이전코드를 변환한 코드이다. 

다음코드에서 나오는 sort 함수는 js 기본내장 sort 함수와는 다른

mongoose 에서 제공하는 sort 함수이다. ( 사용법도 조금 다름 )

**`.limit(count)`**:
`count`에 지정된 숫자만큼의 결과만 반환하도록 제한합니다. 예를 들어, `count`가 `5`라면, 최대 5개의 `Task` 문서만 반환됩니다.

```jsx
app.get('/tasks' , async (req , res) => {
    
    const sort = req.query.sort;
    const count = Number(req.query.count) || 0;
    const sortOption = {created : sort === 'oldest' ? 'asc' : 'desc'};
    const tasks = await Task.find().sort(sortOption).limit(count);
    res.send(tasks);
})

app.get('/tasks/:id' , async (req , res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if(task){
        res.status(200).send(task);
    }else{
        res.status(404).send({message:'cannot found given id task'})
    }
} )
```

## mongoose 를 이요한 데이터 생성

모델함수 create 를 사용하고 아규먼트에 req.body  를 전달한다.

mongoose schema 를 기반으로 프로퍼티값이 자동으로 설정 되고 객체가 생성된다.

그러므로 req.body  로 전달된 데이터만을 넣어주면 된다.

**Model.create( )**

```jsx
app.post('/tasks' , async ( req ,res) => {
    const newTask = await Task.create(req.body);
    res.status(201).send(newTask);
    
})
```

### schema 를 통한 유효성 검사.

필드에 대한 옵션부분에 추가하면 된다.

다음처럼  ⇒ required: true , maxLength:30 

**required true 는 title 필드는 필수 값으로 설정한다는 뜻이다.**

maxLength는 30자 내로 글자수를 제한하는 것이다.

**기본적으로  mongoose schema 에 정의되지 않은 필드는 따로 검사를 하지 않는다.**

**고로 이상한 필드를  requset body 로 보내도 반응이 없다.**

```jsx
    {
        title : {
            type : String,
            required: true,
            maxLength:30,
        },
        description : {
            type : String,
        },
        isComplete : {
            type : Boolean,
            default : false,
        },
    },
```

## 벨리데이션 오류  관련. (서버가 죽음)

비동기 작업을 처리하는 과정에서 오류가 발생하면 생긴다.

예를 들어 유효하지않는  url 을 서버로 전달한다든가..

**try catch 문 활용 :**  비동기 작업중 오류가 생겼을때 error 가 발생하는 상황을 고려하기 않고

코드를 진행하면 error 가 발생했을때 서버가 죽어버리는 이슈가 생긴다.

try catch 문을 활용한 비동기 함수 장치를 따로 작성.

다음의 asyncHandler 함수는 파라미터로 비동기 함수를 받는다.

return 값을 다시 비동기로 파라미터로 받은 함수를 작동한다 ⇒ 

**이때 try catch 문을 활용해서 error  의 name 프로퍼티로 접근하여 error 의 종류를** 

**파악하고 그에맞는 status 를 retrun 해준다.**

**여기서 포인트 asyncHandler 함수도 비동기로 처리하는 이유!**

파라미터로 넘겨준 함수가 비동기 함수 이기때문에 , 물론 비동기 함수가 아니더라도

넘겨준 함수의 결과 값을 기다리고 그 결과값을 토대로 try catch 문을 실행해야 하기 때문에

2중 비동기 함수의 모양이 나오는 것이다.

**다음함수에 대한 설명 ⇒**

asyncHandler 는 서버에 ./tasks 같은 URL 경로로 요청들이 들어왔고 그에 대한 response 응답

을 해주는 **라우터를 처리하기 전에 실행하는 “미들웨어”가 된다.**

다음 코드는 라우터를 실행하기전에 asyncHandler 를 비동기 방식으로 실행하여 

그다음 라우터를 비동기로 실행하고 라우터의 결과 값을 받아 오류가있는지 확인하는 코드가 된다.

즉 ⇒ res 를 돌려주기 전에 오류를 검사하는 장치를 실행하는 것이니 **이것은 미들웨어가 된다.**

```jsx
function asyncHandler(handler) {
    return async function (req, res) {
        try  {
            await handler(req ,res);
        } catch (error) {
            if(error.name === 'ValidationError') {
                res.status(400).send({message : error.message});
            }else if(error.name === 'CastError'){
                res.status(404).send({message : 'Cannot find given id.'});
            }else{
                res.status(500).send({message : error.message});
            }
        }
    }
}
app.get('/tasks' , asyncHandler( async (req , res) => { 
    const sort = req.query.sort;
    const count = Number(req.query.count) || 0;
    const sortOption = {created : sort === 'oldest' ? 'asc' : 'desc'};
    const tasks = await Task.find().sort(sortOption).limit(count);
    res.send(tasks);
}))
```

## 데이터베이스 데이터 수정(PATCH),삭제(DELETE)

다음PATCH 라우트 에서 생소한 코드가 있다.

바로 **save ( ) 함수인데 ⇒ save함수는 수정하고자 하는 데이터를 데이터베이스에 저장** 

하기위에서 필요한 함수이다. 

함수가 호출되면 새로운 문서를 데이터베이스에 삽입한다. Task 모델로 생성된 객체를

json형식으로… mongoDB에서는 기본적으로 수정된 필드만 업데이트를 진행한다.

**함수를 호출한 시점에서의 수정된 데이터를 반영**

save 함수를 호출하지않으면 수정된 데이터가 데이터베이스에 반영되지 않는다.

Model.findByIdAndDelete(id) 함수

이함수는 데이터베이스에서 id 를 조회해서 아규먼트로 넘겨준 id 값을 찾아서

삭제해준다. 아주 편리한것 같다.

delete 라우트에서는 보통 상태코드만을 return 하는 경우가 있다.

그럴때는 sendStatus 메소드를 활용한다.

```jsx
app.patch('/tasks/:id' , asyncHandler( async (req , res ) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    if(task) {
    Object.keys(req.body).forEach((el) =>  {
        task[el] = req.body[el];
    });
    await task.save();
    res.send(task);
    } else {
        res.status(404).send({message : "Cannot find given id."})
    }
}))

app.delete('/tasks/:id',asyncHandler( async (req , res) => {
    const id = req.params.id;
    const task = await Task.findByIdAndDelete(id);
    if(task){
        res.sendStatus(204);
    }else{
        res.status(404).send({message: "Cannot find given id."})
    }
}))
```
