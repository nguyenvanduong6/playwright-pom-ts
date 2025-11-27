# QC Role Rules

Bạn đang làm việc với một dự án Playwright testing sử dụng Page Object Model (POM) pattern và TypeScript. Khi được yêu cầu làm việc với vai trò QC (Quality Control), hãy tuân theo các quy tắc sau:

## Cấu trúc dự án

- **Test files**: Nằm trong `fixture_pom_test/` hoặc `pom_test/`
- **Page Objects**: Nằm trong `pages/` - mỗi page có một class riêng
- **Fixtures**: Nằm trong `fixtures/` - chứa authentication fixtures và page fixtures
- **Config**: `playwright.config.ts` - cấu hình chính của Playwright

## Quy tắc viết test cases

### 1. Sử dụng Page Object Model
- Luôn sử dụng page objects từ `pages/` thay vì tương tác trực tiếp với page
- Mỗi page object có các methods để tương tác với elements
- Không hardcode selectors trong test files

### 2. Sử dụng Fixtures
- Sử dụng fixtures từ `fixtures/fixtures.ts` để có authenticated context
- Có 3 roles: `guest`, `user`, `admin`
- Sử dụng `test.use({ role: 'user' })` để set role cho test
- Sử dụng `loginPage` và `homePage` fixtures thay vì khởi tạo trực tiếp

### 3. Test Structure
- Sử dụng `test.describe()` để nhóm các test cases liên quan
- Sử dụng `test.step()` để mô tả các bước trong test (Given-When-Then format)
- Test names nên rõ ràng và mô tả được mục đích test

### 4. Assertions
- Sử dụng `expect` từ fixtures: `import { test, expect } from '../fixtures/fixtures'`
- Assertions nên được đặt trong page object methods khi có thể
- Sử dụng descriptive error messages

## Ví dụ test case đúng

```typescript
import { test, expect } from '../fixtures/fixtures';

test.describe('Home page tests with user authentication', () => {
  test.use({ role: 'user' });

  test('Verify user logged in', async ({ homePage }) => {
    await test.step('Given User open Login screen', async () => {
      await homePage.goTo();
    });

    await test.step('Then User should be logged in', async () => {
      await homePage.isLoggedIn();
    });
  });
});
```

## Quy tắc tạo Page Objects

### 1. Class Structure
- Mỗi page object là một class export default
- Constructor nhận `Page` object từ Playwright
- Khai báo locators như properties của class
- Methods là async functions

### 2. Locators
- Sử dụng data-qa attributes khi có thể: `page.locator('input[data-qa="login-email"]')`
- Khai báo locators trong constructor
- Sử dụng descriptive names cho locators

### 3. Methods
- Methods nên có tên mô tả rõ ràng action
- Methods cho navigation: `goTo()`, `navigateTo()`
- Methods cho actions: `clickLoginButton()`, `inputEmail()`
- Methods cho assertions: `isLoggedIn()`, `isDisplayLoginPage()`
- Methods composite: `login(email, password)` - kết hợp nhiều actions

## Ví dụ Page Object đúng

```typescript
import { expect, Locator, Page } from '@playwright/test';

export default class LoginPage {
  emailTxb: Locator;
  passwordTxb: Locator;
  loginBtn: Locator;

  constructor(public page: Page) {
    this.emailTxb = page.locator('input[data-qa="login-email"]');
    this.passwordTxb = page.locator('input[data-qa="login-password"]');
    this.loginBtn = page.locator('button[data-qa="login-button"]');
  }

  async goTo() {
    await this.page.goto('login');
  }

  async login(email: string, password: string) {
    await this.inputEmail(email);
    await this.inputPassword(password);
    await this.clickLoginButton();
  }
}
```

## Quy tắc khi tạo test mới

1. **Kiểm tra page object đã tồn tại chưa**: Nếu chưa có, tạo mới trong `pages/`
2. **Sử dụng fixtures**: Luôn sử dụng fixtures thay vì khởi tạo page objects trực tiếp
3. **Test data**: Sử dụng test data hợp lý, không hardcode sensitive data
4. **Environment variables**: Sử dụng `ENV=example` khi chạy tests
5. **Test steps**: Sử dụng `test.step()` để mô tả rõ ràng các bước
6. **Error handling**: Tests nên fail với messages rõ ràng

## Quy tắc khi sửa test

1. **Giữ nguyên structure**: Không thay đổi cấu trúc test nếu không cần thiết
2. **Update page objects**: Nếu cần thay đổi selectors, update trong page objects
3. **Maintain fixtures**: Không thay đổi fixtures nếu không hiểu rõ impact
4. **Test isolation**: Mỗi test nên độc lập, không phụ thuộc vào test khác

## Quy tắc khi debug

1. **Screenshots**: Đã được config tự động capture khi test fail
2. **Traces**: Đã được config để collect khi retry
3. **Console logs**: Có thể thêm console.log để debug nhưng nên remove sau
4. **Test.only**: Chỉ dùng khi debug, nhớ remove trước khi commit

## Commands quan trọng

- `npm run test-run`: Chạy tất cả tests
- `npm run generate-auth`: Generate authentication states cho các roles
- `npm run lint`: Check code quality
- `npm run report`: Xem Allure report

## Lưu ý quan trọng

- **Authentication**: Phải chạy `npm run generate-auth` trước khi chạy tests với roles `user` hoặc `admin`
- **Environment**: Luôn set `ENV=example` khi chạy tests
- **Base URL**: Được config trong `.env.example` file
- **CI/CD**: Tests sẽ tự động retry 2 lần trên CI

## Khi được yêu cầu tạo test mới

1. Xác định page object cần thiết
2. Kiểm tra page object đã tồn tại chưa
3. Nếu chưa có, tạo page object mới với đầy đủ locators và methods
4. Tạo test file sử dụng fixtures và page objects
5. Sử dụng test.step() để mô tả rõ ràng
6. Đảm bảo test có assertions phù hợp

## Khi được yêu cầu fix test

1. Xác định nguyên nhân test fail
2. Kiểm tra page object có đúng selectors không
3. Kiểm tra fixtures có hoạt động đúng không
4. Fix trong page object nếu là vấn đề về selectors
5. Fix trong test nếu là vấn đề về logic test
6. Đảm bảo test pass sau khi fix

