# endpoints
## login
```
  endpoint: /api/authentication
  method: POST
  body:{
    name: string
    password: string
  }
  ---------- respostas ----------
  sucesso: {
    Auth: objeto, 
    token: string
  }
  falha: status 400
```
## cadastro
```
  endpoint: /api/registering
  method: POST
  body:{
    name: string,
    email: string,
    cpf: number,
    picture: string,
    password: string,
    confPass: string,
  }
  ---------- respostas ----------
  email_in_use: boolean e aparece caso um email já exista 
  password_fail: boolean e aparece caso a confirmação da senha seja invalida

  sucesso: status(200).json({ success: true })
```
## serviços
```
  endpoint: /api/index
  method: GET
```

## filtro de serviços
```
  endpoint: /api/index?filter="title"
  method: GET
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
  ---------- respostas ----------
  sucesso: status(200).json({ success: true })
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
  ---------- respostas ----------
  is_not_you: boolean e aparece quando não é o dono do serviço

  sucesso: status(200).json({ success: true })
```

## excluindo um serviço
```
  endpoint: /api/delete/:id
  method: DELETE
  headers:{
    'Content-Type':'application/json',
    'Authorization':'Bearer "token do usuário logado"'
  }
  ---------- respostas ----------
  is_not_you: boolean e aparece quando não é o dono do serviço

  sucesso: status(200).json({ success: true })
```
