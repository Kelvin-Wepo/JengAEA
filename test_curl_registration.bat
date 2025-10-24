@echo off
echo Testing registration with curl...

curl -X POST http://127.0.0.1:8000/api/auth/register/ ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser3\",\"email\":\"test3@example.com\",\"phone_number\":\"+254700000002\",\"role\":\"homeowner\",\"password\":\"testpassword123\",\"password_confirm\":\"testpassword123\",\"first_name\":\"Test\",\"last_name\":\"User\",\"location\":\"Nairobi, Kenya\",\"company_name\":\"\"}"

echo.
echo Registration test complete.
pause



