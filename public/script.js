document.addEventListener('DOMContentLoaded', () => {
    
    const btnDescubra = document.getElementById('btn-descubra');
    if(btnDescubra) {
        btnDescubra.addEventListener('click', () => {
            document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' });
        });
    }

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    const form = document.getElementById('newsletter-form');
    if(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            const emailInput = document.getElementById('email-input').value;

            try {
                const response = await fetch('/api/inscrever', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: emailInput })
                });

                const data = await response.json();

                if(response.ok) {
                    alert('Inscrição confirmada! ' + data.message);
                    form.reset();
                } else {
                    alert('Erro: ' + data.error);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Ocorreu um erro ao conectar com o servidor.');
            }
        });
    }
});