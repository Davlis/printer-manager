import { browser, by, element } from 'protractor';

export class PrinterViewPage {
    getNameInput() {
        return element.all(by.css('input')).get(0);
    }

    getStatusInput() {
        return element(by.css('p-dropdown')).click();
    }

    clickOnlineOpt() {
        return element(by.cssContainingText('span', 'Online')).click();
    }

    getNetworkInput() {
        return element.all(by.css('input')).get(3);
    }

    getDescriptionInput() {
        return element(by.css('textarea'));
    }

    getColorInput() {
        return element.all(by.css('input')).get(4);
    }

    submitForm() {
        const el = element(by.css('form'));
        el.submit();
    }
}
