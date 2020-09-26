import React, {FC, useState} from "react";
import {Button, Modal, Space, Table, Tag} from "antd";
import html2canvas from "html2canvas";
import {SaveToFileProps} from "./SaveToFile.model";
import XLSX from "xlsx";
import {saveAs} from "file-saver";
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable';

import './SaveToFile.scss';

export const SaveToFile: FC<SaveToFileProps> = (props) => {

    const columnsState = ['dateTime', 'timeToComplete', 'type', 'name', 'course', 'organizer', 'place'];
    const columns = props.columns.filter((item: any) => columnsState.includes(item.dataIndex))
    const columnsArr = columns.map((item: any) => item.title);
    const dataArr = props.data.map((item: any) => {
        const result: any = [item.dateTime, item.timeToComplete, item.type, item.name, item.course, item.organizer, item.place];
        return result;
    })

    const [visibleModal, setVisibleModal] = useState(false);
    const showModal = () => {
        setVisibleModal(true);
    }
    const onCancel = () => {
        setVisibleModal(false);
    }

    const createExcel = () => {
        // @ts-ignore
        const wb = XLSX.utils.book_new();
        wb.Props = {
            Title: "RS-School Schedule",
            CreatedDate: new Date()
        }
        wb.SheetNames.push("Schedule");
        const ws_data = [columnsArr, ...dataArr];
        console.log('ws_data', ws_data)
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
        wb.Sheets["Schedule"] = ws;
        const wbout = XLSX.write(wb, {bookType: "xlsx", type: "binary"});


        /*const wb = XLSX.utils.table_to_book(document.getElementById('table-to-file'), {sheet: "Schedule"});
        const wbout = XLSX.write(wb, {bookType:"xlsx", bookSST:true, type:"binary"});*/
        function s2ab(s: any) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        }
        saveAs(new Blob([s2ab(wbout)],{type: "application/octet-stream"}), 'schedule.xlsx');
        setVisibleModal(false);
    }


    const createPDF = () => {
        html2canvas(document.querySelector('.ant-modal-body') as HTMLElement).then(function (canvas) {
            const img = canvas.toDataURL('image/png');
            const doc = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: [297, 210]
            });
            // @ts-ignore
            doc.addImage(img, 'JPEG', 0, 0, 0, 0, /*undefined, undefined, 90*/);
            doc.save('schedule.pdf');
        });
        setVisibleModal(false);
    }

    const createPDFtable = () => {
        const doc = new jsPDF()
        autoTable(doc,{
            head: [columnsArr],
            body: dataArr,
            styles: {font: "times", fontStyle: "normal"}
        })
        doc.save('table.pdf');
        setVisibleModal(false);
    }



    return (
        <>
            <Button className="save-to-file-btn" onClick={showModal}>Save to file</Button>
            <Modal
                title="Create PDF"
                visible={visibleModal}
                onCancel={onCancel}
                width={1000}
                footer={[
                    <Button onClick={createExcel}>Excel</Button>,
                    <Button onClick={createPDF}>PDF/img</Button>,
                    <Button onClick={createPDFtable}>PDF/table</Button>,
                    <Button onClick={onCancel} danger>Cancel</Button>,
                ]}>
                <Table id="table-to-file" size="middle" columns={columns} dataSource={props.data} />
            </Modal>
        </>
    )
}