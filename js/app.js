const app = {
    styles: [
        'plain',
        'empty',
        'light',
        'highlight',
    ],

    selectedStyle: 'plain',
    customColor: null,
    
    init: function() {
        app.pixelContainer = document.querySelector('#invader');
        app.configForm = document.querySelector('.configuration');
        document.getElementById('custom-selector').addEventListener('change', function (event) {
            app.customColor = event.target.value;
        });
        app.tools = document.querySelector('.invader-tools');
        app.generateConfigForm();
        app.gridCreator(15, 15);
        app.generatePalette();
        
        app.pixelContainer.addEventListener('click', app.handleOnClickPixel)
        app.configForm.addEventListener('submit',app.formSubmitHandler);
    },

    generateConfigForm: function () {
        let gridSizeInput = document.createElement('input');
        gridSizeInput.setAttribute('type', 'number');
        gridSizeInput.setAttribute('name', 'gridsize');
        gridSizeInput.required = true;
        gridSizeInput.setAttribute('id', 'gridsize');
        gridSizeInput.setAttribute("placeholder", "Nombre de ligne");
        gridSizeInput.setAttribute('min', 2);
        gridSizeInput.setAttribute('max', 50);
        gridSizeInput.classList.add('grid');
        app.configForm.appendChild(gridSizeInput);
        
        let pixelSizeInput = document.createElement('input');
        pixelSizeInput.setAttribute('type', 'number');
        pixelSizeInput.setAttribute('name', 'pixelSize');
        pixelSizeInput.required = true;
        pixelSizeInput.setAttribute('id', 'pixelsize');
        pixelSizeInput.setAttribute('placeholder', 'Nombre de pixel');
        pixelSizeInput.setAttribute('min', 2);
        pixelSizeInput.setAttribute('max', 50);
        pixelSizeInput.classList.add('pixel-size');
        app.configForm.appendChild(pixelSizeInput);

        let buttonForm = document.createElement('button');
        buttonForm.setAttribute('type', 'submit');
        buttonForm.textContent = 'Valider';
        buttonForm.classList.add('button');
        app.configForm.appendChild(buttonForm);
    },

    generatePalette: function() {
        let paletteNode = document.getElementById('palette');
        app.styles.forEach(function (style) {
            let styleNode = document.createElement('div');
            styleNode.classList.add('style-selector');
            styleNode.setAttribute('data-style-name', style);
            styleNode.addEventListener('click', app.selectStyle)
            paletteNode.appendChild(styleNode);
        });
    },

    selectStyle: function(event) {
        let itemSelectorNode = event.target;
        app.selectedStyle = event.target.getAttribute('data-style-name');
        app.customColor = null;
    },



    formSubmitHandler: function (event) {
        event.preventDefault();

        const gridSize = document.getElementById('gridsize');
        const pixelSize = document.getElementById('pixelsize');
        app.clearGrid();
        app.gridCreator(gridSize.value, pixelSize.value);
    },   

    gridCreator: function(gridSize, pixelSize) {
        app.pixelContainer.addEventListener('click', app.handleOnClickPixel);
        for (let iRow = 0; iRow < gridSize; iRow++) {
            let pixelRow = document.createElement('div');
            pixelRow.classList.add('pixel-row');
            for (let iPixel = 0; iPixel < pixelSize; iPixel++) {
                let pixel = document.createElement('div');
                pixel.classList.add('pixel');
                pixel.classList.add('pixel--colored-white');
                pixelRow.appendChild(pixel);
            }
            app.pixelContainer.appendChild(pixelRow);
        }
    },

    handleOnClickPixel: function (event) {
        let clickedPixel = event.target;
        if(app.customColor) {
            clickedPixel.setAttribute('data-style-name', '');
            clickedPixel.style.backgroundColor = app.customColor;
        } else {
            clickedPixel.setAttribute('data-style-name', app.selectedStyle);
            clickedPixel.style.removeProperty('background-color');
        }
    },

    clearGrid: function() {
        app.pixelContainer.textContent = '';
    },


}
document.addEventListener('DOMContentLoaded', app.init());