import { browser, by, element } from 'protractor';

export class PrinterViewPage {
    getNameInput() {
        return element.all(by.css('input')).get(0);
    }

    getTypeInput() {
        return element.all(by.css('p-dropdown')).get(0);
    }

    getStatusInput() {
        return element.all(by.css('p-dropdown')).get(1);
    }

    getNetworkAddressInput() {
        return element.all(by.css('input')).get(5);
    }

    getDescriptionInput() {
        return element(by.css('textarea'));
    }

    getColorInput() {
        return element.all(by.css('input')).get(6);
    }

    setName(name) {
        const el = this.getNameInput();
        el.sendKeys(name);
    }

    setType(type) {
        const el = this.getTypeInput();
        el.click();
        element(by.cssContainingText('span', type)).click();
    }

    setStatus(status) {
        const el = this.getStatusInput();
        el.click();
        element(by.cssContainingText('span', status)).click();
    }

    setNetworkAddress(address) {
        const el = this.getNetworkAddressInput();
        el.sendKeys(address);
    }

    setDescription(description) {
        const el = this.getDescriptionInput();
        el.sendKeys(description);
    }

    setColor(color) {
        const el = this.getColorInput();
        el.sendKeys(color);
    }

    getForm() {
        return element(by.css('form'));
    }

    submitForm() {
        const el = this.getForm();
        el.submit();
    }
}
