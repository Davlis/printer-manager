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
            type: 'Needle',
            status: 'Online',
            ipAddress: '192.168.0.13',
            description: 'My printer',
            color: 'Red',
        };

        listPage.navigateTo();
        const btn = listPage.getAddButton();
        btn.click();

        viewPage.setName(PRINTER.name);
        viewPage.setType(PRINTER.type);
        viewPage.setStatus(PRINTER.status);
        viewPage.setNetworkAddress(PRINTER.ipAddress);
        viewPage.setDescription(PRINTER.description);
        viewPage.setColor(PRINTER.color);
        viewPage.submitForm();
        expect(listPage.getFirstElementName()).toEqual(PRINTER.name);
    });
});
