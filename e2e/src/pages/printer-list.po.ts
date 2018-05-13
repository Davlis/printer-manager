import { browser, by, element } from 'protractor';

export class PrinterListPage {
    navigateTo() {
        return browser.get('/printer');
    }

    getAddButton() {
        return element(by.css('button'));
    }

    getFirstElementName() {
        const el = element.all(by.css('td')).get(0);
        return el.getText();
    }
}
