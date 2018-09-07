---
title: Typesafe action trong redux với Typescript
permalink: typesafe-action-trong-redux-voi-typescript
layout: post
---

# Vấn đề
Tình cờ bắt gặp bài viết [Managing state in angular 2 app](http://victorsavkin.com/post/137821436516/managing-state-in-angular-2-applications) của Victor Savkin, mình chợt nhận ra Action của [redux](https://github.com/reactjs/redux) có thể được viết dưới dạng class của [typescript]() để đảm bảo an toàn kiểu. Ví dụ ta không thể truy cập vào một property không tồn tại của một action, chẳng hạn:
```typescript
class AddTodoAction {
	public text: string;
}

/*reducer*/
const todos = (state, action) => {
	if ( /*type of action is AddTodoAction*/ ) {
   		 let id = action.id; // Báo lỗi, truy cập vào property không tồn tại trong action
    }
	//...
}
```

![Vsavkin's](/content/images/2016/03/vsavkin1.png)
![Vsavkin's](/content/images/2016/03/vsavkin2.png)

Tuy nhiên cách kiểm tra của [@vsavkin](http://github.com/vsavkin), dùng `instanceof`, lại không được khuyến khích, như [@gaearon](http://github.com/gaearon) đã [chỉ ra](https://github.com/reactjs/redux/issues/992#issuecomment-153138700) rằng tính năng record, replay action của redux sẽ serialize action thành JSON và ngược lại, khi đó thông tin về class sẽ bị mất. Như vậy cuối cùng vẫn phải chỉ định property `type` của action một cách tường minh.

Như vậy chúng ta phải dùng một cách nào đó thay vì dùng `instanceof` mà vẫn đảm bảo an toàn kiểu.

#Typescript

Vì chúng ta lười, không muốn viết `type = 'x';` trong tất cá các action, và vì chúng ta pro nên chúng ta sẽ sử dụng những công cụ thời thượng nhất.

## Decorator
Decorator là một hàm bậc cao, nhận vào một hàm và trả lại một hàm có thêm vài behaviour mới. Ở đây chúng ta thêm property `type` vào prototype của hàm.

Hãy tưởng tượng chúng ta sẽ sử dụng decorator như thế này để thêm type add todo vào class AddTodoAction.

```typescript
@ActionType('AddTodo')
class AddTodoAction extends Action {

}
```
Một function cho phép thêm property vào object được decorate, ở đây là type.

``` language-typescript
/*định  nghĩa giao diện của lớp action có prototype*/
interface IAction<T extends Action> {
  prototype: T;
}

/*abstract class Action tự set type của instance = prototype.type*/
export abstract class Action {
  type: string;

  constructor() {
    this.type = this.type;
  }
}

/* decorator set prototype.type = name */
export function ActionType(name: string) {
  return function<T extends Action>(actionClass: IAction<T>) {
    actionClass.prototype.type = name;
  }
}
```

## Type guard

Type guard cho phép bộ dịch của typescript ngăn chặn các hành động không "đúng đắn" với các object. Ví dụ:

```typescript
if (typeof a === 'string') {
	return a.substr(0, 3); // OK
} else {
	return a.length // Error, không có gì đảm bảo a có property length
}
```

Typescript cho phép dùng `typeof` và `instanceof` làm type guard. Ngoài ra có thế tự định nghĩa type guard. Đây là thứ chúng ta có thế dùng.

Định nghĩa một type guard rất đơn giản, như một hàm và kiểu trả về là `arg is T`

```typescript
export function isActionType<T extends Action>(
  action: Action,
  actionClass: IAction<T>
): action is T {
  return action.type === actionClass.prototype.type;
}

```

Done, vậy là đã xong, chúng ta có thế sử dụng như thế này:

```typescript
// Định nghĩa action
@ActionType('ToogleTodo')
export class ToogleTodoAction extends Action {
  constructor(public _id: string) {
    super();
  }
}


// Trong reducer
function todos(state, action) {
	if (isActionType(action, ToggleTodoAction)) {
    	return state.map(todo => {

           // truy cập hợp lệ vì action được đảm bảo có prop _id
           if (todo._id === action._id) { 
         		todo.completed = !todo.completed;
           }
           
           return todo;
        });
    }
	
    return state;
}
```

---
**Nguồn:**

- Issue này chứa nhiều bình luận hữu ích [#](https://github.com/reactjs/redux/issues/992)
- Về type guards [#](https://basarat.gitbooks.io/typescript/content/docs/types/typeGuard.html)

*Cross posted on [kipalog](http://kipalog.com/posts/Typesafe-action-trong-redux-voi-Typescript)*
