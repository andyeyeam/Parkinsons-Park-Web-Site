
import React from 'react';
import { useDownload } from '../hooks/useDownload';
import DownloadDialog from '../components/DownloadDialog';
import {
  FileText, Gavel, Search, History, Shield
} from 'lucide-react';

const Governance: React.FC = () => {
  const { downloadState, initiateDownload, closeDialog } = useDownload();

  return (
    <div className="bg-stone-50 pb-24">
      {/* Header Section */}
      <section className="bg-emerald-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-800/50 rounded-2xl mb-6 backdrop-blur-sm border border-emerald-700">
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Governance</h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto font-light leading-relaxed">
            Annual reports, meeting minutes, governance structure and the bylaws that protect Parkinson's Park.
          </p>
        </div>
      </section>

      {/* Reports & Minutes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* CIC Reports */}
          <div id="reports" className="space-y-6 scroll-mt-24">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <FileText className="w-6 h-6 text-emerald-600" />
              CIC Reports (34 Report)
            </h3>
            <p className="text-sm text-stone-600">
              CICs are required to complete an annual return to Companies House detailing how the purpose has been achieved.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { year: "2016/17", file: "CIC34-2016-17.pdf" },
                { year: "2017/18", file: "CIC34-2017-18.pdf" },
                { year: "2018/19", file: "CIC34-2018-19.pdf" },
                { year: "2019/20", file: "CIC34-2019-20.pdf" },
                { year: "2020/21", file: "CIC34-2020-21.pdf" },
                { year: "2021/22", file: "CIC34-2021-22.pdf" },
                { year: "2022/23", file: "CIC34-2022-23.pdf" },
                { year: "2024/25", file: "CIC34-2024-25.pdf" }
              ].map((report) => (
                <button
                  key={report.year}
                  onClick={() => initiateDownload(
                    `${import.meta.env.BASE_URL}documents/${report.file}`,
                    report.file
                  )}
                  className="p-3 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 hover:border-emerald-600 hover:text-emerald-700 transition-all text-center cursor-pointer"
                >
                  Report {report.year}
                </button>
              ))}
            </div>
            <p className="text-xs text-stone-400 italic">2023/24 Report: Not yet available</p>
          </div>

          {/* AGM/EGM Minutes */}
          <div id="minutes" className="space-y-6 scroll-mt-24">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <History className="w-6 h-6 text-emerald-600" />
              Archive: AGM/EGM Minutes
            </h3>
            <div className="space-y-3">
              {[
                { date: "May 2012", type: "AGM", file: "AGM-Minutes-May-2012.pdf" },
                { date: "April 2013", type: "AGM", file: "AGM-Minutes-April-2013.pdf" },
                { date: "April 2014", type: "AGM", file: "AGM-Minutes-April-2014.docx" },
                { date: "November 2015", type: "EGM", file: "EGM-Minutes-November-2015.pdf" },
                { date: "April 2026", type: "AGM", file: "AGM-Minutes-April-2026.pdf" }
              ].map((min, i) => (
                <button
                  key={i}
                  onClick={() => initiateDownload(
                    `${import.meta.env.BASE_URL}documents/${min.file}`,
                    min.file
                  )}
                  className="flex items-center justify-between p-4 bg-white border border-stone-200 rounded-2xl hover:bg-stone-50 transition-all group w-full cursor-pointer"
                >
                  <span className="font-bold text-stone-800">{min.type} Minutes - {min.date}</span>
                  <FileText className="w-4 h-4 text-stone-300 group-hover:text-emerald-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Bylaws Section */}
      <section className="bg-stone-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Governance */}
            <div id="governance" className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-200 scroll-mt-24">
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Gavel className="w-8 h-8 text-emerald-700" />
                Governance
              </h3>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  The Park is owned by <strong>Bellway Homes</strong>; basic maintenance is done by <strong>Meadfleet</strong> to an annual maintenance plan determined by a management plan agreed with FOPP.
                </p>
                <p>
                  Funding for basic maintenance comes out of an annual charge made by Meadfleet to the residents of Edison Fields; other money for Park improvements and events is raised by FOPP.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => initiateDownload(
                      `${import.meta.env.BASE_URL}documents/FOPP-CIC-Constitution.pdf`,
                      'FOPP-CIC-Constitution.pdf'
                    )}
                    className="flex items-center gap-2 text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    <FileText className="w-4 h-4" /> CIC Constitution
                  </button>
                </div>

                <div className="mt-6 p-6 bg-stone-50 rounded-2xl border border-stone-200">
                  <button
                    onClick={() => initiateDownload(
                      `${import.meta.env.BASE_URL}documents/Management-Plan-2026.docx`,
                      'Management-Plan-2026.docx'
                    )}
                    className="flex items-center gap-2 text-emerald-700 font-bold text-lg hover:underline cursor-pointer"
                  >
                    <FileText className="w-5 h-5" /> Management Plan 2026
                  </button>
                  <p className="mt-3 text-sm text-stone-500">
                    The full plan plus its five supporting appendices — all available to download:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li>
                      <button
                        onClick={() => initiateDownload(
                          `${import.meta.env.BASE_URL}documents/Management-Plan-Appendix-One.docx`,
                          'Management-Plan-Appendix-One.docx'
                        )}
                        className="flex items-center gap-2 text-emerald-700 hover:underline cursor-pointer"
                      >
                        <FileText className="w-4 h-4" /> Appendix One
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => initiateDownload(
                          `${import.meta.env.BASE_URL}documents/FOPP-CIC-Constitution.pdf`,
                          'FOPP-CIC-Constitution.pdf'
                        )}
                        className="flex items-center gap-2 text-emerald-700 hover:underline cursor-pointer"
                      >
                        <FileText className="w-4 h-4" /> Appendix Two — CIC Constitution
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => initiateDownload(
                          `${import.meta.env.BASE_URL}documents/Management-Plan-App-Three-Annual-Events.docx`,
                          'Management-Plan-App-Three-Annual-Events.docx'
                        )}
                        className="flex items-center gap-2 text-emerald-700 hover:underline cursor-pointer"
                      >
                        <FileText className="w-4 h-4" /> Appendix Three — Annual Events
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => initiateDownload(
                          `${import.meta.env.BASE_URL}documents/Management-Plan-App-Four-Maintenance-Plan.docx`,
                          'Management-Plan-App-Four-Maintenance-Plan.docx'
                        )}
                        className="flex items-center gap-2 text-emerald-700 hover:underline cursor-pointer"
                      >
                        <FileText className="w-4 h-4" /> Appendix Four — Maintenance Plan
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => initiateDownload(
                          `${import.meta.env.BASE_URL}documents/Management-Plan-App-Five-Project-Improvement-Plan.docx`,
                          'Management-Plan-App-Five-Project-Improvement-Plan.docx'
                        )}
                        className="flex items-center gap-2 text-emerald-700 hover:underline cursor-pointer"
                      >
                        <FileText className="w-4 h-4" /> Appendix Five — Project Improvement Plan
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bylaws */}
            <div id="bylaws" className="bg-white p-10 rounded-[3rem] shadow-sm border border-stone-200 scroll-mt-24">
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Search className="w-8 h-8 text-emerald-700" />
                Park Bylaws
              </h3>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  FOPP are members of the Leeds Parks Forum. The Park has adopted Leeds Parks Bylaws which include:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2"><span>•</span> No horses, cycling, or camping without consent.</li>
                  <li className="flex gap-2"><span>•</span> No fires, fireworks or barbeques without consent.</li>
                  <li className="flex gap-2"><span>•</span> No missiles likely to cause injury to others.</li>
                  <li className="flex gap-2"><span>•</span> No excessive noise unless part of approved entertainment.</li>
                  <li className="flex gap-2"><span>•</span> Dog owners must remove all fouling to bins located around the Park edge.</li>
                  <li className="flex gap-2"><span>•</span> No events without consent.</li>
                </ul>
                <div className="flex flex-wrap gap-3 mt-6">
                  <button
                    onClick={() => initiateDownload(
                      `${import.meta.env.BASE_URL}documents/Leeds-Parks-Bylaws-Appendix-One.docx`,
                      'Leeds-Parks-Bylaws-Appendix-One.docx'
                    )}
                    className="flex items-center gap-2 text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    <FileText className="w-4 h-4" /> Full Bylaws Document
                  </button>
                </div>
                <p className="mt-4 text-xs font-semibold text-stone-400 uppercase tracking-widest">
                  Parkwatch scheme supported by West Yorkshire Police.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DownloadDialog
        isOpen={downloadState.isOpen}
        onClose={closeDialog}
        fileName={downloadState.fileName}
        fileUrl={downloadState.fileUrl}
      />
    </div>
  );
};

export default Governance;
