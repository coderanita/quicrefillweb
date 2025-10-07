import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaClipboard } from "react-icons/fa";
import Header from '../Includes/Header';
import Sidebar from '../Includes/Sidebar';
import PageHeaderWithFilters from '../Includes/PageHeaderWithFilters';
import { showSweetAlert } from '../Includes/SweetAlert2';

export const CrashAnalyticsDetails = ({ userId, sidebarCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  const [adminComments, setAdminComments] = useState<string[]>([]);

  // Mock crash data
const sampleVitalsData = [
  {
    id: 'C1001',
    title: "Input dispatching timed-out (random.generated.98TGH-link.lorem...)",
    subTitle: "random.generated.98TGH-link.lorem.",
    type: "0.24%",
    newInProduction: "",
    occurrences: "1,276",
    impactedUsers: "844",
    lastOccurred: "34 minutes ago",
    errorDetails: {
      type: "PaymentTimeoutException",
      firstOccurred: "Today 09:42 AM",
      lastOccurred: "2 min ago",
      affected: "142 users (12 active sessions)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "Checkout fails at final step",
        "Error message: \"Payment processing timed out\""
      ],
      timeline: [
        "09:42 - Error first detected (auto-reported)",
        "09:45 - Marked as priority by Admin Alex",
        "09:50 - Note added: \"Occurs with PayPal payments\""
      ]
    }
  },
  {
    id: 'C1002',
    title: "Uncaught reference error in dashboard widget (chart.render.util)",
    subTitle: "chart.render.util",
    type: "0.15%",
    newInProduction: "Yes",
    occurrences: "980",
    impactedUsers: "510",
    lastOccurred: "5 minutes ago",
    errorDetails: {
      type: "ReferenceError",
      firstOccurred: "Today 10:15 PM",
      lastOccurred: "1 min ago",
      affected: "510 users (30 active sessions)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "Dashboard charts do not display",
        "Users see a blank widget area"
      ],
      timeline: [
        "10:15 - Error reported immediately after deploy (Version 2.3.1)",
        "10:17 - Escalated to UI team lead"
      ]
    }
  },
  {
    id: 'C1003',
    title: "Deadlock detected in connection pool (db.transaction.lock)",
    subTitle: "db.transaction.lock",
    type: "0.08%",
    newInProduction: "No",
    occurrences: "450",
    impactedUsers: "320",
    lastOccurred: "2 hours ago",
    errorDetails: {
      type: "DatabaseDeadlockError",
      firstOccurred: "Yesterday 05:00 PM",
      lastOccurred: "4 min ago",
      affected: "320 users (8 active sessions)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "User profile updates freeze",
        "Data integrity risk due to rollback failure"
      ],
      timeline: [
        "05:00 PM - Initial report of transaction timeout",
        "07:30 PM - Root cause identified as resource deadlock in module X"
      ]
    }
  },
  {
    id: 'C1004',
    title: "Excessive disk I/O causing slowness (storage.access.large_file)",
    subTitle: "storage.access.large_file",
    type: "0.55%",
    newInProduction: "",
    occurrences: "3,100",
    impactedUsers: "2,500",
    lastOccurred: "1 minute ago",
    errorDetails: {
      type: "PerformanceDegradation",
      firstOccurred: "Today 10:30 AM",
      lastOccurred: "1 min ago",
      affected: "2,500 users (50 active sessions)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "Load times for media assets increased by 400%",
        "High server latency"
      ],
      timeline: [
        "10:30 AM - Alert triggered: Disk utilization > 95%",
        "10:45 AM - Investigation started by DevOps team"
      ]
    }
  },
  {
    id: 'C1005',
    title: "Out of memory exception during large file upload (upload.service.buffer)",
    subTitle: "upload.service.buffer",
    type: "0.33%",
    newInProduction: "Yes",
    occurrences: "1,240",
    impactedUsers: "910",
    lastOccurred: "55 minutes ago",
    errorDetails: {
      type: "OutOfMemoryError",
      firstOccurred: "Today 08:00 AM",
      lastOccurred: "3 min ago",
      affected: "910 users (20 active sessions)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "Users cannot upload files larger than 10MB",
        "App crash upon upload failure"
      ],
      timeline: [
        "08:00 AM - First OOM error reported in logs",
        "08:15 AM - Found to be an issue with a new memory buffer allocation logic"
      ]
    }
  },
  {
    id: 'C1006',
    title: "Incorrect data structure passed to API (api.v2.data.validation)",
    subTitle: "api.v2.data.validation",
    type: "0.11%",
    newInProduction: "No",
    occurrences: "522",
    impactedUsers: "388",
    lastOccurred: "Yesterday",
    errorDetails: {
      type: "SchemaValidationFailure",
      firstOccurred: "3 days ago",
      lastOccurred: "1 day ago",
      affected: "388 users (5 active sessions)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "New user sign-up fails on certain mobile devices",
        "Backend service returns HTTP 400 Bad Request"
      ],
      timeline: [
        "Day 1 - Error noted by support team",
        "Day 2 - Isolated the issue to Android v10 devices"
      ]
    }
  },
  {
    id: 'C1007',
    title: "Unhandled promise rejection in background sync (sync.worker.failed)",
    subTitle: "sync.worker.failed",
    type: "0.29%",
    newInProduction: "",
    occurrences: "1,567",
    impactedUsers: "1,020",
    lastOccurred: "12 minutes ago",
    errorDetails: {
      type: "PromiseRejectionError",
      firstOccurred: "Today 07:00 PM",
      lastOccurred: "10 min ago",
      affected: "1,020 users (40 active sessions)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "Offline data sync is unreliable",
        "Potential data loss for users with poor connectivity"
      ],
      timeline: [
        "07:00 PM - Initial sync worker failure alert",
        "07:30 PM - Confirmed that retries are also failing due to unhandled error"
      ]
    }
  },
  {
    id: 'C1008',
    title: "Security warning: Cross-site scripting vulnerability (user.input.sanitize)",
    subTitle: "user.input.sanitize",
    type: "0.01%",
    newInProduction: "Yes",
    occurrences: "5",
    impactedUsers: "5",
    lastOccurred: "1 week ago",
    errorDetails: {
      type: "SecurityWarning (XSS)",
      firstOccurred: "7 days ago",
      lastOccurred: "7 days ago",
      affected: "5 attempts (0 confirmed breach)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "Potential for session hijacking (High Severity)",
        "Affects public-facing comment section"
      ],
      timeline: [
        "Day 1 - Reported by external security researcher",
        "Day 2 - Hotfix deployed and vulnerability contained"
      ]
    }
  },
  {
    id: 'C1009',
    title: "Infinite loop in rendering component logic (ui.component.loop.break)",
    subTitle: "ui.component.loop.break",
    type: "0.41%",
    newInProduction: "No",
    occurrences: "2,400",
    impactedUsers: "1,850",
    lastOccurred: "3 hours ago",
    errorDetails: {
      type: "ClientSideHang",
      firstOccurred: "4 days ago",
      lastOccurred: "20 min ago",
      affected: "1,850 users (15 active sessions)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "Browser/App becomes unresponsive on profile page",
        "Users must force-close and restart"
      ],
      timeline: [
        "Day 4 - Noticed by internal QA team",
        "Day 5 - Traced to a dependency update with breaking changes"
      ]
    }
  },
  {
    id: 'C1010',
    title: "Geo-location service failure on certain OS versions (gps.lib.init)",
    subTitle: "gps.lib.init",
    type: "0.19%",
    newInProduction: "",
    occurrences: "765",
    impactedUsers: "490",
    lastOccurred: "50 minutes ago",
    errorDetails: {
      type: "ServiceUnavailable",
      firstOccurred: "Today 06:00 PM",
      lastOccurred: "3 min ago",
      affected: "490 users (10 active sessions)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "Map features are unusable for users on iOS 17.5",
        "Failure to retrieve current location"
      ],
      timeline: [
        "06:00 PM - Surge in location service error logs",
        "06:30 PM - Confirmed to be a compatibility issue with a recent OS patch"
      ]
    }
  },
  {
    id: 'C1011',
    title: "Unexpected null value access in core module (core.data.process.null)",
    subTitle: "core.data.process.null",
    type: "0.95%",
    newInProduction: "Yes",
    occurrences: "5,120",
    impactedUsers: "4,000",
    lastOccurred: "1 minute ago",
    errorDetails: {
      type: "NullPointerException",
      firstOccurred: "Today 10:55 PM",
      lastOccurred: "30 sec ago",
      affected: "4,000 users (100 active sessions)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "Core feature X completely disabled",
        "Highest volume error in the last hour"
      ],
      timeline: [
        "10:55 PM - Massive spike in null pointer exceptions",
        "11:00 PM - Production rollback initiated"
      ]
    }
  },
  {
    id: 'C1012',
    title: "Client-side routing failure due to missing route (router.config.missing)",
    subTitle: "router.config.missing",
    type: "0.04%",
    newInProduction: "No",
    occurrences: "210",
    impactedUsers: "155",
    lastOccurred: "8 hours ago",
    errorDetails: {
      type: "RoutingError",
      firstOccurred: "1 day ago",
      lastOccurred: "1 hour ago",
      affected: "155 users (5 active sessions)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "Specific marketing deep-links result in 404 page",
        "Loss of conversion from external campaigns"
      ],
      timeline: [
        "Day 1 - Campaign launch failure noticed",
        "Day 2 - Route config verified as missing in production server 2"
      ]
    }
  },
  {
    id: 'C1013',
    title: "API rate limit exceeded on external service (ext.api.third_party)",
    subTitle: "ext.api.third_party",
    type: "0.60%",
    newInProduction: "",
    occurrences: "3,500",
    impactedUsers: "2,800",
    lastOccurred: "15 minutes ago",
    errorDetails: {
      type: "RateLimitExceeded",
      firstOccurred: "Today 09:30 AM",
      lastOccurred: "5 min ago",
      affected: "2,800 users (50 active sessions)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "External data widgets fail to load",
        "Service temporarily degraded until midnight (reset time)"
      ],
      timeline: [
        "09:30 AM - Rate limit threshold breached (auto-alert)",
        "09:45 AM - Temporary caching layer implemented as mitigation"
      ]
    }
  },
  {
    id: 'C1014',
    title: "Data corruption on batch processing job (batch.job.data.integrity)",
    subTitle: "batch.job.data.integrity",
    type: "0.02%",
    newInProduction: "Yes",
    occurrences: "10",
    impactedUsers: "10",
    lastOccurred: "4 hours ago",
    errorDetails: {
      type: "DataIntegrityError",
      firstOccurred: "Today 07:00 AM",
      lastOccurred: "30 min ago",
      affected: "10 users (1 failed job)",
      stackTrace: "[expandable code block with syntax highlighting]",
      impact: [
        "Monthly reporting figures are incorrect (critical)",
        "Job requires manual restart and data rollback"
      ],
      timeline: [
        "07:00 AM - Batch job completed with data corruption flags",
        "08:00 AM - Job marked as 'FAILED_CRITICAL' and automated runs halted"
      ]
    }
  }
];

  const crash = sampleVitalsData.find((c) => c.id === id);

  const handleCommentSubmit = () => {
    if (!comment.trim()) return; // ignore empty
    setAdminComments(prev => [...prev, comment]);
    showSweetAlert("Comment Added", "success");
    setComment("");
    setShowCommentModal(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header
        onToggleSidebar={toggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
        userId={userId}
      />
      <div className="flex flex-1">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {/* Page Header */}
          <PageHeaderWithFilters
            title="Crash Analytics Details"
            breadcrumbs={[{ label: "Review the details of this crash activity below." }]}
            showExportButton={false}
            filterCategories={[]}
            onDateChange={() => {}}
            onFilterChange={() => {}}
            onExportClick={() => {}}
            showDateSelector={false}
            showBackButton={true}
            onBackClick={() => navigate('/crash-analytics-all-vitals')}
          />

          {/* Crash Not Found */}
          {!crash && (
            <div className="flex items-center justify-center mt-20 text-red-500 font-semibold">
              Crash ID not found
            </div>
          )}

          {/* Crash Details */}
          {crash && (
            <div className="max-w-xl w-full bg-white rounded-lg shadow-md overflow-hidden mt-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h1 className="text-xl font-semibold text-gray-800">Crash ID: {crash.id}</h1>
                <p className="text-sm text-gray-600 mt-1">{crash.title}</p>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Error Details</h3>
                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                  <div className="grid grid-cols-[1fr_2fr] text-sm text-gray-600 border-b border-gray-200 bg-gray-100">
                    <div className="px-4 py-3 font-medium text-gray-700">Label</div>
                    <div className="px-4 py-3 font-medium text-gray-700">Value</div>
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] text-sm text-gray-800 border-b border-gray-200">
                    <div className="px-4 py-3 text-gray-600">Type</div>
                    <div className="px-4 py-3">{crash.errorDetails.type}</div>
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] text-sm text-gray-800 border-b border-gray-200">
                    <div className="px-4 py-3 text-gray-600">First Occurred</div>
                    <div className="px-4 py-3">{crash.errorDetails.firstOccurred}</div>
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] text-sm text-gray-800 border-b border-gray-200">
                    <div className="px-4 py-3 text-gray-600">Last Occurred</div>
                    <div className="px-4 py-3">{crash.errorDetails.lastOccurred}</div>
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] text-sm text-gray-800">
                    <div className="px-4 py-3 text-gray-600">Affected</div>
                    <div className="px-4 py-3">{crash.errorDetails.affected}</div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Stack Trace</h3>
                <p className="text-sm text-gray-600">{crash.errorDetails.stackTrace}</p>
              </div>

              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">User Impact</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                  {crash.errorDetails.impact.map((impact, i) => (
                    <li key={i}>{impact}</li>
                  ))}
                </ul>
              </div>

              <div className="px-6 py-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Timeline</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {crash.errorDetails.timeline.map((event, i) => (
                    <li key={i}>{event}</li>
                  ))}
                </ul>
              </div>

              {/* Admin Comments */}
              {adminComments.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Admin Notes / Comments</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {adminComments.map((cmt, i) => (
                      <li key={i}>{cmt}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="px-4 py-4 border-t border-gray-200 flex flex-wrap gap-3 justify-center text-sm">
                <button className="flex-1 min-w-[160px] px-2 py-2 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-600"
                  onClick={() => showSweetAlert('Marking...as Priority','info')}
                >
                  Mark as priority
                </button>
                <button className="flex-1 min-w-[160px] px-2 py-2 bg-green-500 text-white font-medium rounded-md hover:bg-green-600"
                  onClick={() => showSweetAlert('Marking...as Resolved','success')}
                >
                  Mark as resolved
                </button>
                <button className="flex-1 min-w-[160px] px-2 py-2 bg-orange-500 text-black font-medium rounded-md hover:bg-orange-600"
                  onClick={() => showSweetAlert('Marking As Under Investigation','warning')}
                >
                  Under investigation
                </button>
              </div>

              {/* Add Comments Button */}
              <div className="px-6 pb-6 flex justify-start">
                <button
                  onClick={() => setShowCommentModal(true)}
                  className="w-full max-w-xs bg-gradient-to-b from-gray-100 to-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm flex items-center justify-center gap-2 border border-gray-300"
                >
                  <FaClipboard className="text-gray-500" />
                  Add Comments/Notes
                </button>
              </div>

              {/* Comment Modal */}
              {showCommentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Add Comment</h2>
                    <textarea
                      className="w-full border border-gray-300 rounded-md p-2 mb-4 text-sm"
                      rows={5}
                      placeholder="Type your comment here..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowCommentModal(false)}
                        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCommentSubmit}
                        className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}
        </main>
      </div>
    </div>
  );
};
