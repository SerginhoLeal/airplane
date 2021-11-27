# endpoints
## login
```
  endpoint: /api/authentication
  method: POST
  body:{
    name: string
    password: string
  }
  sucesso: status 200
  falha: status 400
```
## cadastro
```
  endpoint: /api/registering
  method: POST
  body:{
    name: string,
    email: string,
    cpf: string,
    picture: string,
    password: string,
    confPass: string,
  }
  sucesso: status 200
  falha: status 400
```
## serviços
```
  endpoint: /api/index
  method: GET
  sucesso: status 200
  falha: status 400
```

## filtro de serviços
```
  endpoint: /api/index
  method: GET
  sucesso: status 200
  falha: status 400
```

## cadastros de serviços
```
  endpoint: /api/create
  method: POST
  headers:{
    'Content-Type':'application/json',
    'Authorization':'Bearer "token do usuário logado"'
  }
  body:{
    title: string,
    description: string,
    value: number,
  }
  sucesso: status 200
  falha: status 400
```

## edição de serviços
```
  endpoint: /api/update/:id
  method: PUT
  headers:{
    'Content-Type':'application/json',
    'Authorization':'Bearer "token do usuário logado"'
  }
  body:{
    title: string,
    description: string,
    value: number,
  }
  sucesso: status 200
  falha: status 400
```

## excluindo um serviço
```
  endpoint: /api/delete/:id
  method: DELETE
  headers:{
    'Content-Type':'application/json',
    'Authorization':'Bearer "token do usuário logado"'
  }
  sucesso: status 200
  falha: status 400
```
