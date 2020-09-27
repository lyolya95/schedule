import { FileExcelOutlined, FilePdfOutlined, SaveOutlined } from '@ant-design/icons/lib';
import { Button, Modal, Table, Tooltip } from 'antd';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import React, { FC, useCallback, useState } from 'react';
import XLSX from 'xlsx';
import { SaveToFileProps } from './SaveToFile.model';
import './SaveToFile.scss';

export const SaveToFile: FC<SaveToFileProps> = React.memo(({ widthScreen, columns, data }) => {
  const columnsState = ['dateTime', 'timeToComplete', 'type', 'name', 'course', 'organizer', 'place'];
  const visibleColumns = columns.filter((item: any) => columnsState.includes(item.dataIndex));
  const columnsArr = visibleColumns.map((item: any) => item.title);
  const dataArr = data.map((item: any) => {
    const result: any = [
      item.dateTime,
      item.timeToComplete,
      item.type,
      item.name,
      item.course,
      item.organizer,
      item.place,
    ];
    return result;
  });

  const [visibleModal, setVisibleModal] = useState(false);

  const showModal = useCallback(() => {
    setVisibleModal(true);
  }, [setVisibleModal]);

  const onCancel = useCallback(() => {
    setVisibleModal(false);
  }, [setVisibleModal]);

  const createExcel = useCallback(() => {
    // @ts-ignore
    const wb = XLSX.utils.book_new();
    wb.Props = {
      Title: 'RS-School Schedule',
      CreatedDate: new Date(),
    };
    wb.SheetNames.push('Schedule');
    const ws_data = [columnsArr, ...dataArr];
    console.log('ws_data', ws_data);
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets['Schedule'] = ws;
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    function s2ab(s: any) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xff;
      }
      return buf;
    }

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), 'schedule.xlsx');
    setVisibleModal(false);
  }, [columnsArr, dataArr]);

  const createPDF = useCallback(() => {
    html2canvas(document.querySelector('.ant-modal-body') as HTMLElement).then(function (canvas) {
      const img = canvas.toDataURL('image/png');
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [297, 210],
      });
      // @ts-ignore
      doc.addImage(img, 'JPEG', 0, 0, 0, 0 /*undefined, undefined, 90*/);
      doc.save('schedule.pdf');
    });
    setVisibleModal(false);
  }, []);

  const createPDFtable = useCallback(() => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [columnsArr],
      body: dataArr,
      styles: { font: 'times', fontStyle: 'normal' },
    });
    doc.save('table.pdf');
    setVisibleModal(false);
  }, [dataArr, columnsArr]);

  return (
    <>
      <Tooltip title="Save to file">
        <Button className="save-to-file-btn" onClick={showModal}>
          <SaveOutlined />
        </Button>
      </Tooltip>
      {widthScreen > 800 ? (
        <Modal
          title="Save to file"
          visible={visibleModal}
          onCancel={onCancel}
          width={1000}
          footer={[
            <Button onClick={createExcel}>
              <FileExcelOutlined /> Excel
            </Button>,
            <Button onClick={createPDF}>
              <FilePdfOutlined /> PDF/img
            </Button>,
            <Button onClick={createPDFtable}>
              <FilePdfOutlined /> PDF/table
            </Button>,
            <Button onClick={onCancel} danger>
              Cancel
            </Button>,
          ]}
        >
          <Table id="table-to-file" size="small" columns={visibleColumns} dataSource={data} />
        </Modal>
      ) : (
        <Modal
          title="Save to file"
          visible={visibleModal}
          width={250}
          onCancel={onCancel}
          footer={[
            <Tooltip title="Excel">
              <Button onClick={createExcel}>
                <FileExcelOutlined />
              </Button>
            </Tooltip>,
            <Tooltip title="Pdf">
              <Button onClick={createPDFtable}>
                <FilePdfOutlined />
              </Button>
            </Tooltip>,
            <Button onClick={onCancel} danger>
              Cancel
            </Button>,
          ]}
        >
          Select file format
        </Modal>
      )}
    </>
  );
});
