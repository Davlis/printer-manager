import { PrinterListPage } from '../pages/printer-list.po';
import { PrinterViewPage } from '../pages/printer-view.po';

describe('Printer', () => {
    let listPage: PrinterListPage;
    let viewPage: PrinterViewPage;

    beforeEach(() => {
        listPage = new PrinterListPage();
        viewPage = new PrinterViewPage();
    });

    it('should add new printer', () => {
        const PRINTER = {
            name: 'Prrinter',
            ipAddress: '192.168.0.13',
            description: 'My printer',
            color: 'Red'
        };

        listPage.navigateTo();
        const btn = listPage.getAddButton();
        btn.click();
        const name = viewPage.getNameInput();
        name.sendKeys(PRINTER.name);
        viewPage.getTypeInput();
        viewPage.clickNeedleOpt();
        viewPage.getStatusInput();
        viewPage.clickOnlineOpt();
        const network = viewPage.getNetworkInput();
        network.sendKeys(PRINTER.ipAddress);
        const description = viewPage.getDescriptionInput();
        description.sendKeys(PRINTER.description);
        const color = viewPage.getColorInput();
        color.sendKeys(PRINTER.color);
        viewPage.submitForm();
        expect(listPage.getFirstElementName()).toEqual(PRINTER.name);
    });
});
