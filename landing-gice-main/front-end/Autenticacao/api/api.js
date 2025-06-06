document.addEventListener('DOMContentLoaded', () => {
  const cadastroForm = document.getElementById('form-cadastro');
  const loginForm = document.getElementById('form-login');

  if (cadastroForm) {
    cadastroForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const senha = document.getElementById('senha').value.trim();

      if (!nome || !email || !senha) {
        alert('Preencha todos os campos!');
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: nome,
            email: email,
            password: senha
          })
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem('usuario', JSON.stringify({
            id: data.id || null,
            name: nome,
            email: email
          }));

          alert('Cadastro realizado com sucesso!');
          window.location.href = '../../inicial/telainicial.html'; 
        } else {
          alert(data.message || 'Erro ao cadastrar');
        }
      } catch (err) {
        alert('Erro ao se conectar com o servidor');
        console.error(err);
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('loginEmail').value.trim();
      const senha = document.getElementById('loginSenha').value.trim();

      if (!email || !senha) {
        alert('Preencha todos os campos!');
        return;
      }

      try {
        const res = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            password: senha
          })
        });

        const data = await res.json();

        if (res.ok) {
          // Salva dados retornados no localStorage
          localStorage.setItem('usuario', JSON.stringify(data));

          alert('Login realizado com sucesso!');
          window.location.href = '../../inicial/telainicial.html';
        } else {
          alert(data.message || 'Email ou senha incorretos');
        }
      } catch (err) {
        alert('Erro ao se conectar com o servidor');
        console.error(err);
      }
    });
  }
});
