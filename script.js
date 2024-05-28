document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('setColumnsBtn').addEventListener('click', () => {
        const numColumns = parseInt(document.getElementById('numColumns').value);
        const columnsContainer = document.getElementById('columnsContainer');
        columnsContainer.innerHTML = ''; // Clear existing columns

        for (let i = 0; i < numColumns; i++) {
            const column = document.createElement('div');
            column.classList.add('col-md', 'column');
            column.innerHTML = `
                <button class="btn btn-outline-primary addCardBtn">Add Card</button>
            `;
            columnsContainer.appendChild(column);

            column.querySelector('.addCardBtn').addEventListener('click', () => {
                const card = document.createElement('div');
                card.classList.add('card', 'mb-2');
                card.contentEditable = true;
                card.innerHTML = `
                    <div class="card-body">
                        <div class="cardContent">New Task</div>
                        <button class="btn btn-sm btn-outline-secondary openCardBtn">Open</button>
                    </div>
                `;

                column.insertBefore(card, column.querySelector('.addCardBtn'));

                card.querySelector('.openCardBtn').addEventListener('click', () => {
                    alert(card.querySelector('.cardContent').textContent);
                });

                // Enable drag and drop
                card.draggable = true;
                card.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', null);
                    card.classList.add('dragging');
                });

                card.addEventListener('dragend', () => {
                    card.classList.remove('dragging');
                });

                column.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    const draggingCard = document.querySelector('.dragging');
                    column.insertBefore(draggingCard, column.querySelector('.addCardBtn'));
                });
            });
        }
    });
});
