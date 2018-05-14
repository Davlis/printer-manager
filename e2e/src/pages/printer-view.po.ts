import { browser, by, element } from 'protractor';

export class PrinterViewPage {
    getNameInput() {
        return element.all(by.css('input')).get(0);
    }

    getTypeInput() {
        return element.all(by.css('p-dropdown')).get(0).click();
    }

    clickNeedleOpt() {
        return element(by.cssContainingText('span', 'Needle')).click();
    }

    getStatusInput() {
        return element.all(by.css('p-dropdown')).get(1).click();
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
        return element.all(by.css('input')).get(5);
    }

    submitForm() {
        const el = element(by.css('form'));
        el.submit();
    }
}
