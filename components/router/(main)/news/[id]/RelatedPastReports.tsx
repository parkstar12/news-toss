"use client";

import Modal from "@/components/ui/Modal";
import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const RelatedPastReports = ({ selectedNews }: { selectedNews: string }) => {
  const [reports, setReports] = useState<
    {
      date: number;
      embedding: any[];
      opinion: string;
      reportContent: string;
      secFirm: string;
      similarity: number;
      stockName: string;
      targetPrice: string;
      title: string;
      url: string;
      viewCount: number;
    }[]
  >([]);

  const [selectedReport, setSelectedReport] = useState<{
    date: number;
    embedding: any[];
    opinion: string;
    reportContent: string;
    secFirm: string;
    similarity: number;
    stockName: string;
    targetPrice: string;
    title: string;
    url: string;
    viewCount: number;
  } | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await fetch(
        `/api/news/related/report?newsId=${selectedNews}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();

      setReports(data.data);
      console.log(data.data);
    };

    if (selectedNews) {
      fetchReports();
    }
  }, [selectedNews]);

  if (reports.length === 0) return <div>리포트 없습니다.</div>;

  return (
    <>
      <div className="w-full flex flex-col gap-main">
        <h2 className="text-lg font-semibold">리포트</h2>

        {reports.map((report) => (
          <div
            key={report.title}
            className="flex flex-col gap-main shadow-color p-main rounded-main hover:scale-102 transition-all duration-300"
            onClick={() => {
              setSelectedReport(report);
              setIsOpen(true);
            }}
          >
            <div className="flex flex-col gap-[5px]">
              <div className="text-sm font-semibold flex items-center justify-between">
                <span className="flex-1 truncate">{report.title}</span>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-main-dark-gray">투자 의견:</span>
                  {report.opinion === "Buy" ? (
                    <span className="text-main-red">매수</span>
                  ) : (
                    <span className="text-main-blue">매도</span>
                  )}
                </div>
              </div>
              <span className="text-xs text-main-dark-gray">
                {new Date(report.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2 text-gray-500 text-xs">
                <span>{report.secFirm}</span>
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>{report.viewCount}</span>
                </div>
              </span>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {selectedReport && (
          <div className="flex flex-col gap-main">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold">{selectedReport.title}</h2>
              <p className="text-sm text-main-dark-gray flex items-center gap-1">
                <span>
                  {new Date(selectedReport.date).toLocaleDateString()}
                </span>
                <span> · </span>
                <span>{selectedReport.secFirm}</span>
                <span> · </span>
                <span className="flex items-center gap-1">
                  <Eye size={14} /> {selectedReport.viewCount}
                </span>
              </p>
            </div>

            <div className="bg-gray-100 p-4 rounded-main">
              <p className="text-sm text-gray-700">
                종목명:{" "}
                <span className="font-semibold">
                  {selectedReport.stockName}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                투자의견:{" "}
                {selectedReport.opinion === "Buy" ? (
                  <span className="text-main-red font-semibold">매수</span>
                ) : (
                  <span className="text-main-blue font-semibold">매도</span>
                )}
              </p>
              <p className="text-sm text-gray-700">
                목표주가:{" "}
                <span className="font-semibold">
                  {selectedReport.targetPrice}원
                </span>
              </p>
            </div>

            <div className="flex items-center gap-1 bg-main-blue/20 px-2 py-1 rounded-full w-fit text-sm">
              <span>유사도 | </span>
              <span className="text-main-blue font-semibold">
                {(selectedReport.similarity * 100).toFixed(2)}%
              </span>
            </div>

            <p className="whitespace-pre-line leading-relaxed text-gray-800">
              {selectedReport.reportContent}
            </p>

            <div className="text-right flex justify-end">
              <Link
                href={selectedReport.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 w-fit text-white bg-main-blue px-4 py-2 rounded-main"
              >
                <span>원문 보기</span>
                <ArrowRight size={16} className="animate-bounce-x" />
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default RelatedPastReports;
