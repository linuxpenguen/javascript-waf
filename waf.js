function sanitizeInput(input) {
  // HTML özel karakterlerini değiştirme veya kaldırma
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    "/": '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  const regExp = /[&<>"'`=\/]/g;
  return input.replace(regExp, (match) => map[match]);
}

function validateInput(input) {
  // Gelişmiş doğrulama için örnek: Kötü amaçlı içerik filtreleme
  const maliciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // Script etiketlerini kontrol etme
    /on\w+\s*=/g, // Olay atayıcıları (event handlers) kontrol etme
    /javascript:/gi, // JavaScript protokolünü kontrol etme
    /expression\s*\(/gi, // Expression() fonksiyonunu kontrol etme
    /<\s*iframe/i, // iframe kullanımını kontrol etme
    // ... Diğer potansiyel tehlikeli kalıplar
  ];

  for (let i = 0; i < maliciousPatterns.length; i++) {
    if (maliciousPatterns[i].test(input)) {
      return false; // Kötü amaçlı içerik algılandı
    }
  }

  return true; // Güvenli içerik
}

let userInput = "<script>alert('XSS attack!')</script>";
let sanitizedInput = sanitizeInput(userInput);
console.log(sanitizedInput); // Çıktı: "&lt;script&gt;alert('XSS attack!')&lt;/script&gt;"

if (validateInput(sanitizedInput)) {
  // Eğer geçerliyse işlem yap
  console.log("Geçerli giriş: ", sanitizedInput);
} else {
  console.log("Geçersiz giriş!");
}
