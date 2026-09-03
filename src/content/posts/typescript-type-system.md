---
title: "TypeScript 类型系统：从描述数据到约束状态"
description: "用联合类型、泛型、条件类型和映射类型，把业务规则变成编译器可以检查的结构。"
publishedAt: 2026-08-21
updatedAt: 2026-09-03
category: "TypeScript"
tags: ["TypeScript", "类型建模", "工程化"]
cover: "/assets/software-architecture.webp"
featured: false
draft: false
---

TypeScript 的价值不在于给每个变量补一个类型名，而在于把原本散落在注释、测试和开发者脑中的规则，变成编译器可以持续验证的模型。好的类型会缩小程序可能进入的状态空间；坏的类型只是把 `any` 换成更长的拼写。

## 先消灭不合法状态

最常见的例子是异步请求。三个布尔值看似简单，却允许 `loading`、`success` 和 `error` 同时为真。

```ts
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }
```

判别联合把状态和值绑定在一起。进入 `success` 分支后，`data` 必然存在；进入 `error` 分支后，才允许读取错误信息。

```ts
function renderState(state: RequestState<User[]>) {
  switch (state.status) {
    case 'idle': return '尚未加载'
    case 'loading': return '加载中'
    case 'success': return `${state.data.length} 位用户`
    case 'error': return state.message
    default: return assertNever(state)
  }
}

function assertNever(value: never): never {
  throw new Error(`Unexpected state: ${value}`)
}
```

当以后增加 `cancelled` 状态，`assertNever` 会让遗漏分支成为编译错误。这比依赖某位开发者记得更新所有页面可靠得多。

## 泛型保存关系

泛型不是为了让函数接受“任何值”，而是保存输入与输出之间的关系：

```ts
function first<T>(items: readonly T[]): T | undefined {
  return items[0]
}
```

如果参数是 `User[]`，返回值就是 `User | undefined`。这里的 `T` 传递了信息。相反，一个只出现一次的泛型参数往往没有建立关系，直接使用具体类型或 `unknown` 可能更清楚。

约束用于描述泛型真正依赖的能力：

```ts
function byId<T extends { id: string }>(items: readonly T[]) {
  return new Map(items.map(item => [item.id, item]))
}
```

函数不关心 `T` 的全部字段，只要求它有字符串 `id`。调用者仍能保留更具体的数据类型。

## 从既有类型派生新类型

`keyof`、索引访问与映射类型可以让多个接口共享同一事实来源：

```ts
type FieldErrors<T> = {
  [Key in keyof T]?: string
}

type UserForm = {
  name: string
  email: string
  age: number
}

type UserFormErrors = FieldErrors<UserForm>
```

表单新增字段时，错误对象自动获得同名键。内置的 `Pick`、`Omit`、`Partial` 和 `Required` 也是同类工具，但要警惕过度使用 `Partial`：它会让所有字段都可选，常常掩盖“只有更新场景才允许缺省”的真实规则。

## 条件类型是类型层的模式匹配

条件类型根据输入形状选择结果：

```ts
type AwaitedResult<T> = T extends Promise<infer Value> ? Value : T

type A = AwaitedResult<Promise<User>> // User
type B = AwaitedResult<string>        // string
```

`infer` 从匹配位置提取类型。它很适合封装库边界、API 返回值和元组结构，但不适合炫技。一个需要反复展开才能理解的类型，即使正确，也会提高维护成本。

条件类型遇到裸类型参数的联合时会分发：

```ts
type ToArray<T> = T extends unknown ? T[] : never
type Result = ToArray<string | number> // string[] | number[]
```

如果想把联合整体判断，可以包在元组中：`[T] extends [unknown]`。理解分发行为能避免许多看似“编译器失控”的结果。

## 模板字面量连接协议

当字符串本身携带结构时，可以把协议写进类型：

```ts
type Entity = 'user' | 'post'
type Action = 'created' | 'updated' | 'deleted'
type DomainEvent = `${Entity}:${Action}`
```

它适合事件名、国际化 key、路由参数与 CSS token。不要试图用它验证任意运行时字符串；外部数据仍需 schema 或手动校验。TypeScript 类型在编译后会被擦除，不能替代运行时防线。

## unknown 是边界的默认答案

接口响应、localStorage、消息事件和 JSON 解析结果都来自类型系统之外。把它们直接断言成业务类型，只是要求编译器停止提问。

```ts
function isUser(value: unknown): value is User {
  if (!value || typeof value !== 'object') return false
  return 'id' in value && typeof value.id === 'string'
}
```

大型项目可以使用 Zod 等 schema 工具，但原则不变：外部是 `unknown`，验证后才进入可信领域模型。

## 类型设计的检查清单

- 它是否排除了业务上不可能的组合？
- 泛型是否真的保存了输入输出关系？
- 新增联合成员时，遗漏分支是否会报错？
- 外部数据是否经过运行时验证？
- 错误信息是否比原始实现更容易理解？
- 如果删除这个高级类型，代码会不会反而更清楚？

类型系统不是另一个编程竞赛场。它应该让重构更大胆，让接口更诚实，让错误更接近产生它的位置。

## 延伸阅读

- [TypeScript Handbook：Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [TypeScript Handbook：Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript：Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
