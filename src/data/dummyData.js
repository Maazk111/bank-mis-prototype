// src/data/dummyData.js
// -----------------------------------------------------------------------------
// Central dummy-data source for the Bank Core Banking MIS static prototype.
// All values are illustrative sample data — no real backend/database exists.
// -----------------------------------------------------------------------------

// ----------------------------- ROLES / LOGIN -------------------------------
// Only roles with a built dashboard are listed here (matches Section 6 scope:
// 5 screens). Section 5 of the report documents all 8 roles for the full RBAC
// design, but CSO / Internal Auditor / System Admin / Bank Customer dashboards
// are out of scope for this prototype build.
export const roles = [
  { id: "teller", label: "Teller" },
  { id: "loan-officer", label: "Loan Officer" },
  { id: "branch-manager", label: "Branch Manager" },
  { id: "executive", label: "Bank Executive" },
];

// ------------------------------- USERS --------------------------------------
export const users = [
  { employeeId: "EMP-1001", name: "Junaid Aslam", role: "Teller", branch: "BR001", lastLogin: "2026-06-14 08:45", status: "Active" },
  { employeeId: "EMP-2002", name: "Saima Rafiq", role: "Loan Officer", branch: "BR001", lastLogin: "2026-06-14 08:50", status: "Active" },
  { employeeId: "EMP-3003", name: "Faisal Hameed", role: "Branch Manager", branch: "BR001", lastLogin: "2026-06-14 08:30", status: "Active" },
  { employeeId: "EMP-4004", name: "Nadia Khalid", role: "Bank Executive", branch: "Head Office", lastLogin: "2026-06-14 08:00", status: "Active" },
];

// ------------------------------ BRANCHES -------------------------------------
export const branches = [
  { code: "BR001", name: "Karachi Main", manager: "Faisal Hameed", cashPosition: 24163500, dailyTransactionVolume: 312, activeLoans: 48, newAccountsToday: 6, staffCount: 18 },
  { code: "BR002", name: "DHA Branch", manager: "Nadia Farooq", cashPosition: 18750000, dailyTransactionVolume: 245, activeLoans: 35, newAccountsToday: 4, staffCount: 14 },
  { code: "BR003", name: "Gulshan Branch", manager: "Imran Sheikh", cashPosition: 15200000, dailyTransactionVolume: 198, activeLoans: 29, newAccountsToday: 3, staffCount: 12 },
  { code: "BR004", name: "Clifton Branch", manager: "Sana Yousuf", cashPosition: 21300000, dailyTransactionVolume: 276, activeLoans: 41, newAccountsToday: 5, staffCount: 15 },
];

// ------------------------------ CUSTOMERS -------------------------------------
export const customers = [
  { id: "CUST001", name: "Ali Khan", cnic: "42101-1234567-1", dob: "1988-03-12", contact: "0301-2345678", address: "House 12, Block C, North Nazimabad, Karachi", branch: "BR001", status: "Active", kycStatus: "Verified", joinDate: "2021-05-14" },
  { id: "CUST002", name: "Sara Ahmed", cnic: "42201-2345678-2", dob: "1992-07-25", contact: "0312-3456789", address: "House 45, Phase 6, DHA, Karachi", branch: "BR002", status: "Active", kycStatus: "Verified", joinDate: "2020-11-02" },
  { id: "CUST003", name: "Bilal Malik", cnic: "42301-3456789-3", dob: "1985-01-18", contact: "0333-4567890", address: "Flat 8B, Gulshan-e-Iqbal Block 5, Karachi", branch: "BR003", status: "Active", kycStatus: "Verified", joinDate: "2019-08-30" },
  { id: "CUST004", name: "Fatima Noor", cnic: "42401-4567890-4", dob: "1995-09-09", contact: "0345-5678901", address: "House 22, Khayaban-e-Roomi, Clifton, Karachi", branch: "BR004", status: "Pending", kycStatus: "Pending", joinDate: "2026-06-10" },
  { id: "CUST005", name: "Ahmed Raza", cnic: "42101-5678901-5", dob: "1979-12-02", contact: "0300-1112233", address: "House 7, Block B, North Nazimabad, Karachi", branch: "BR001", status: "Active", kycStatus: "Verified", joinDate: "2018-02-21" },
  { id: "CUST006", name: "Ayesha Siddiqui", cnic: "42201-6789012-6", dob: "1990-04-30", contact: "0321-2223344", address: "House 19, Phase 2, DHA, Karachi", branch: "BR002", status: "Active", kycStatus: "Verified", joinDate: "2022-01-15" },
  { id: "CUST007", name: "Usman Tariq", cnic: "42301-7890123-7", dob: "1983-06-11", contact: "0335-3334455", address: "Flat 14C, Gulshan-e-Iqbal Block 13, Karachi", branch: "BR003", status: "Flagged", kycStatus: "Verified", joinDate: "2017-09-05" },
  { id: "CUST008", name: "Hina Sheikh", cnic: "42401-8901234-8", dob: "1997-02-27", contact: "0312-4445566", address: "House 33, Khayaban-e-Shahbaz, Clifton, Karachi", branch: "BR004", status: "Active", kycStatus: "Verified", joinDate: "2023-03-18" },
  { id: "CUST009", name: "Kamran Malik", cnic: "42101-9012345-9", dob: "1975-10-20", contact: "0300-5556677", address: "House 5, Block F, North Nazimabad, Karachi", branch: "BR001", status: "Inactive", kycStatus: "Verified", joinDate: "2015-06-12" },
  { id: "CUST010", name: "Zara Hassan", cnic: "42201-0123456-0", dob: "1999-11-05", contact: "0345-6667788", address: "House 28, Phase 5, DHA, Karachi", branch: "BR002", status: "Active", kycStatus: "Verified", joinDate: "2024-07-22" },
];

// ------------------------------- ACCOUNTS --------------------------------------
export const accounts = [
  { accountNumber: "PK01-1001-0001", customerId: "CUST001", customerName: "Ali Khan", type: "Savings", balance: 485200, iban: "PK36BANK0001234567890101", branch: "BR001", openingDate: "2021-05-14", status: "Active" },
  { accountNumber: "PK01-1001-0002", customerId: "CUST001", customerName: "Ali Khan", type: "Current", balance: 152300, iban: "PK36BANK0001234567890102", branch: "BR001", openingDate: "2022-01-10", status: "Active" },
  { accountNumber: "PK02-1002-0001", customerId: "CUST002", customerName: "Sara Ahmed", type: "Savings", balance: 920400, iban: "PK36BANK0002345678900201", branch: "BR002", openingDate: "2020-11-02", status: "Active" },
  { accountNumber: "PK02-1002-0002", customerId: "CUST002", customerName: "Sara Ahmed", type: "Fixed Deposit", balance: 2000000, iban: "PK36BANK0002345678900202", branch: "BR002", openingDate: "2023-04-01", status: "Active" },
  { accountNumber: "PK03-1003-0001", customerId: "CUST003", customerName: "Bilal Malik", type: "Current", balance: 64800, iban: "PK36BANK0003456789000301", branch: "BR003", openingDate: "2019-08-30", status: "Active" },
  { accountNumber: "PK04-1004-0001", customerId: "CUST004", customerName: "Fatima Noor", type: "Savings", balance: 15000, iban: "PK36BANK0004567890100401", branch: "BR004", openingDate: "2026-06-10", status: "Pending" },
  { accountNumber: "PK01-1005-0001", customerId: "CUST005", customerName: "Ahmed Raza", type: "Savings", balance: 1340000, iban: "PK36BANK0001567890100501", branch: "BR001", openingDate: "2018-02-21", status: "Active" },
  { accountNumber: "PK02-1006-0001", customerId: "CUST006", customerName: "Ayesha Siddiqui", type: "Current", balance: 238500, iban: "PK36BANK0002678901200601", branch: "BR002", openingDate: "2022-01-15", status: "Active" },
  { accountNumber: "PK03-1007-0001", customerId: "CUST007", customerName: "Usman Tariq", type: "Savings", balance: 5430000, iban: "PK36BANK0003789012300701", branch: "BR003", openingDate: "2017-09-05", status: "Flagged" },
  { accountNumber: "PK04-1008-0001", customerId: "CUST008", customerName: "Hina Sheikh", type: "Savings", balance: 312900, iban: "PK36BANK0004890123400801", branch: "BR004", openingDate: "2023-03-18", status: "Active" },
  { accountNumber: "PK01-1009-0001", customerId: "CUST009", customerName: "Kamran Malik", type: "Current", balance: 8200, iban: "PK36BANK0001901234500901", branch: "BR001", openingDate: "2015-06-12", status: "Inactive" },
  { accountNumber: "PK02-1010-0001", customerId: "CUST010", customerName: "Zara Hassan", type: "Savings", balance: 178600, iban: "PK36BANK0002012345601001", branch: "BR002", openingDate: "2024-07-22", status: "Active" },
];

// ----------------------------- TRANSACTIONS ------------------------------------
// Treat this whole array as "today's transactions" for KPI calculations.
export const transactions = [
  { id: "TXN20260614001", accountNumber: "PK01-1001-0001", customerName: "Ali Khan", date: "2026-06-14", time: "09:12", type: "Deposit", amount: 50000, channel: "Branch Counter", status: "Completed", refNo: "REF-100231", branch: "BR001" },
  { id: "TXN20260614002", accountNumber: "PK01-1005-0001", customerName: "Ahmed Raza", date: "2026-06-14", time: "09:34", type: "Withdrawal", amount: 75000, channel: "Branch Counter", status: "Completed", refNo: "REF-100232", branch: "BR001" },
  { id: "TXN20260614003", accountNumber: "PK01-1001-0002", customerName: "Ali Khan", date: "2026-06-14", time: "09:50", type: "Transfer", amount: 25000, channel: "Branch Counter", status: "Completed", refNo: "REF-100233", branch: "BR001" },
  { id: "TXN20260614004", accountNumber: "PK01-1009-0001", customerName: "Kamran Malik", date: "2026-06-14", time: "10:05", type: "Deposit", amount: 8000, channel: "Branch Counter", status: "Completed", refNo: "REF-100234", branch: "BR001" },
  { id: "TXN20260614005", accountNumber: "PK02-1002-0001", customerName: "Sara Ahmed", date: "2026-06-14", time: "09:20", type: "Deposit", amount: 120000, channel: "Branch Counter", status: "Completed", refNo: "REF-100235", branch: "BR002" },
  { id: "TXN20260614006", accountNumber: "PK02-1006-0001", customerName: "Ayesha Siddiqui", date: "2026-06-14", time: "09:55", type: "Withdrawal", amount: 45000, channel: "Branch Counter", status: "Completed", refNo: "REF-100236", branch: "BR002" },
  { id: "TXN20260614007", accountNumber: "PK03-1003-0001", customerName: "Bilal Malik", date: "2026-06-14", time: "10:10", type: "Deposit", amount: 30000, channel: "Branch Counter", status: "Completed", refNo: "REF-100237", branch: "BR003" },
  { id: "TXN20260614008", accountNumber: "PK03-1007-0001", customerName: "Usman Tariq", date: "2026-06-14", time: "10:22", type: "Withdrawal", amount: 850000, channel: "Branch Counter", status: "Flagged", refNo: "REF-100238", branch: "BR003" },
  { id: "TXN20260614009", accountNumber: "PK04-1008-0001", customerName: "Hina Sheikh", date: "2026-06-14", time: "10:30", type: "Transfer", amount: 60000, channel: "Branch Counter", status: "Completed", refNo: "REF-100239", branch: "BR004" },
  { id: "TXN20260614010", accountNumber: "PK01-1005-0001", customerName: "Ahmed Raza", date: "2026-06-14", time: "10:45", type: "Deposit", amount: 200000, channel: "Branch Counter", status: "Completed", refNo: "REF-100240", branch: "BR001" },
  { id: "TXN20260614011", accountNumber: "PK01-1001-0001", customerName: "Ali Khan", date: "2026-06-14", time: "11:00", type: "Withdrawal", amount: 15000, channel: "Branch Counter", status: "Completed", refNo: "REF-100241", branch: "BR001" },
  { id: "TXN20260614012", accountNumber: "PK02-1010-0001", customerName: "Zara Hassan", date: "2026-06-14", time: "11:10", type: "Deposit", amount: 40000, channel: "Branch Counter", status: "Completed", refNo: "REF-100242", branch: "BR002" },
  { id: "TXN20260614013", accountNumber: "PK01-1001-0002", customerName: "Ali Khan", date: "2026-06-14", time: "11:25", type: "Deposit", amount: 18500, channel: "Branch Counter", status: "Completed", refNo: "REF-100243", branch: "BR001" },
  { id: "TXN20260614014", accountNumber: "PK04-1004-0001", customerName: "Fatima Noor", date: "2026-06-14", time: "11:40", type: "Deposit", amount: 15000, channel: "Branch Counter", status: "Pending", refNo: "REF-100244", branch: "BR004" },
  { id: "TXN20260614015", accountNumber: "PK01-1009-0001", customerName: "Kamran Malik", date: "2026-06-14", time: "11:55", type: "Withdrawal", amount: 5000, channel: "Branch Counter", status: "Completed", refNo: "REF-100245", branch: "BR001" },
  { id: "TXN20260614016", accountNumber: "PK03-1003-0001", customerName: "Bilal Malik", date: "2026-06-14", time: "12:05", type: "Transfer", amount: 12000, channel: "Branch Counter", status: "Completed", refNo: "REF-100246", branch: "BR003" },
  { id: "TXN20260614017", accountNumber: "PK02-1002-0002", customerName: "Sara Ahmed", date: "2026-06-14", time: "12:20", type: "Deposit", amount: 500000, channel: "Branch Counter", status: "Flagged", refNo: "REF-100247", branch: "BR002" },
  { id: "TXN20260614018", accountNumber: "PK01-1005-0001", customerName: "Ahmed Raza", date: "2026-06-14", time: "12:35", type: "Transfer", amount: 100000, channel: "Branch Counter", status: "Completed", refNo: "REF-100248", branch: "BR001" },
  { id: "TXN20260614019", accountNumber: "PK04-1008-0001", customerName: "Hina Sheikh", date: "2026-06-14", time: "12:50", type: "Withdrawal", amount: 22000, channel: "Branch Counter", status: "Completed", refNo: "REF-100249", branch: "BR004" },
  { id: "TXN20260614020", accountNumber: "PK01-1001-0001", customerName: "Ali Khan", date: "2026-06-14", time: "13:05", type: "Deposit", amount: 60000, channel: "Branch Counter", status: "Completed", refNo: "REF-100250", branch: "BR001" },
];

// -------------------------------- LOANS ----------------------------------------
export const loans = [
  { id: "LN2026-001", customerId: "CUST001", customerName: "Ali Khan", type: "Personal Loan", amount: 500000, interestRate: 18.5, termMonths: 24, status: "Approved", applicationDate: "2026-05-02", approvalDate: "2026-05-10", branch: "BR001", creditScore: 742, monthlyInstallment: 25141, purpose: "Home renovation" },
  { id: "LN2026-002", customerId: "CUST002", customerName: "Sara Ahmed", type: "Home Loan", amount: 8000000, interestRate: 16.0, termMonths: 180, status: "Pending", applicationDate: "2026-06-08", branch: "BR002", creditScore: 781, monthlyInstallment: 113500, purpose: "Purchase of residential plot" },
  { id: "LN2026-003", customerId: "CUST003", customerName: "Bilal Malik", type: "Car Loan", amount: 2500000, interestRate: 17.5, termMonths: 60, status: "Pending", applicationDate: "2026-06-11", branch: "BR003", creditScore: 698, monthlyInstallment: 62300, purpose: "Toyota Corolla 2026" },
  { id: "LN2026-004", customerId: "CUST005", customerName: "Ahmed Raza", type: "Business Loan", amount: 5000000, interestRate: 19.0, termMonths: 36, status: "Approved", applicationDate: "2026-04-15", approvalDate: "2026-04-25", branch: "BR001", creditScore: 765, monthlyInstallment: 183200, purpose: "Working capital - textile business" },
  { id: "LN2026-005", customerId: "CUST006", customerName: "Ayesha Siddiqui", type: "Personal Loan", amount: 300000, interestRate: 18.5, termMonths: 12, status: "Overdue", applicationDate: "2025-09-01", approvalDate: "2025-09-10", branch: "BR002", creditScore: 612, monthlyInstallment: 27800, purpose: "Medical expenses" },
  { id: "LN2026-006", customerId: "CUST007", customerName: "Usman Tariq", type: "Car Loan", amount: 4200000, interestRate: 17.5, termMonths: 60, status: "Rejected", applicationDate: "2026-05-20", rejectionReason: "Existing account flagged for AML review", branch: "BR003", creditScore: 540, monthlyInstallment: 0, purpose: "Honda Civic 2026" },
  { id: "LN2026-007", customerId: "CUST008", customerName: "Hina Sheikh", type: "Personal Loan", amount: 250000, interestRate: 18.5, termMonths: 18, status: "Pending", applicationDate: "2026-06-12", branch: "BR004", creditScore: 705, monthlyInstallment: 16100, purpose: "Wedding expenses" },
  { id: "LN2026-008", customerId: "CUST009", customerName: "Kamran Malik", type: "Business Loan", amount: 1500000, interestRate: 19.0, termMonths: 24, status: "Overdue", applicationDate: "2025-03-10", approvalDate: "2025-03-18", branch: "BR001", creditScore: 588, monthlyInstallment: 75600, purpose: "Shop inventory" },
  { id: "LN2026-009", customerId: "CUST010", customerName: "Zara Hassan", type: "Car Loan", amount: 1800000, interestRate: 17.5, termMonths: 48, status: "Approved", applicationDate: "2026-05-28", approvalDate: "2026-06-05", branch: "BR002", creditScore: 730, monthlyInstallment: 45200, purpose: "Suzuki Alto 2026" },
  { id: "LN2026-010", customerId: "CUST004", customerName: "Fatima Noor", type: "Personal Loan", amount: 200000, interestRate: 18.5, termMonths: 12, status: "Pending", applicationDate: "2026-06-13", branch: "BR004", creditScore: 0, monthlyInstallment: 18500, purpose: "Education fee" },
];

// Sample repayment schedule (first 5 installments) for the loan-detail / receipt preview
export const sampleRepaymentSchedule = {
  loanId: "LN2026-001",
  customerName: "Ali Khan",
  principal: 500000,
  interestRate: 18.5,
  termMonths: 24,
  monthlyInstallment: 25141,
  schedule: [
    { installmentNo: 1, dueDate: "2026-06-10", principal: 17433, interest: 7708, total: 25141, status: "Paid" },
    { installmentNo: 2, dueDate: "2026-07-10", principal: 17702, interest: 7438, total: 25141, status: "Paid" },
    { installmentNo: 3, dueDate: "2026-08-10", principal: 17975, interest: 7165, total: 25141, status: "Upcoming" },
    { installmentNo: 4, dueDate: "2026-09-10", principal: 18252, interest: 6888, total: 25141, status: "Upcoming" },
    { installmentNo: 5, dueDate: "2026-10-10", principal: 18534, interest: 6607, total: 25141, status: "Upcoming" },
  ],
};

// --------------------------- STAFF PERFORMANCE -----------------------------------
export const staffPerformance = [
  { employeeId: "EMP-1001", name: "Junaid Aslam", role: "Teller", transactionsProcessed: 142, avgTimePerTxn: "2m 10s", errorRate: "0.4%" },
  { employeeId: "EMP-1010", name: "Rabia Aslam", role: "Teller", transactionsProcessed: 128, avgTimePerTxn: "2m 35s", errorRate: "0.8%" },
  { employeeId: "EMP-2002", name: "Saima Rafiq", role: "Loan Officer", transactionsProcessed: 18, avgTimePerTxn: "—", errorRate: "0%" },
  { employeeId: "EMP-1015", name: "Hassan Ali", role: "Customer Service Officer", transactionsProcessed: 64, avgTimePerTxn: "4m 02s", errorRate: "1.2%" },
];

// ------------------------------- REPORT DATA --------------------------------------
export const endOfDaySummary = {
  date: "2026-06-14",
  branch: "Karachi Main",
  openingCashBalance: 24163500,
  totalDeposits: 336500,
  totalWithdrawals: 95000,
  totalTransfers: 125000,
  closingCashBalance: 24405000,
  totalTransactions: 10,
  reconciliationStatus: "Balanced",
};

export const sbpMonthlyReportPreview = {
  reportingMonth: "May 2026",
  branch: "Karachi Main",
  totalDeposits: 845000000,
  totalAdvances: 312000000,
  totalTransactions: 5820,
  amlFlags: 1,
  largeTransactionsReported: 3,
  submissionStatus: "Pending Submission",
};

// ------------------------------ CHART DATA ----------------------------------------
export const monthlyTransactionTrend = [
  { month: "Jan", deposits: 18500000, withdrawals: 12300000, transactions: 5240 },
  { month: "Feb", deposits: 19800000, withdrawals: 13100000, transactions: 5390 },
  { month: "Mar", deposits: 21200000, withdrawals: 14200000, transactions: 5610 },
  { month: "Apr", deposits: 20500000, withdrawals: 13800000, transactions: 5480 },
  { month: "May", deposits: 22900000, withdrawals: 15100000, transactions: 5820 },
  { month: "Jun", deposits: 24100000, withdrawals: 15900000, transactions: 6050 },
];

export const accountGrowthTrend = [
  { month: "Jan", newAccounts: 28, totalAccounts: 1180 },
  { month: "Feb", newAccounts: 32, totalAccounts: 1212 },
  { month: "Mar", newAccounts: 35, totalAccounts: 1247 },
  { month: "Apr", newAccounts: 30, totalAccounts: 1277 },
  { month: "May", newAccounts: 38, totalAccounts: 1315 },
  { month: "Jun", newAccounts: 41, totalAccounts: 1356 },
];

// --------------------------- MULTI-BRANCH (EXECUTIVE) ------------------------------
export const branchComparison = [
  { branch: "Karachi Main", code: "BR001", deposits: 845000000, loans: 312000000, customers: 1356, transactions: 6050, revenue: 18400000 },
  { branch: "DHA Branch", code: "BR002", deposits: 612000000, loans: 248000000, customers: 980, transactions: 4720, revenue: 14100000 },
  { branch: "Gulshan Branch", code: "BR003", deposits: 480000000, loans: 195000000, customers: 845, transactions: 3890, revenue: 11200000 },
  { branch: "Clifton Branch", code: "BR004", deposits: 705000000, loans: 268000000, customers: 1120, transactions: 5340, revenue: 16500000 },
];

export const executiveSummary = {
  totalDeposits: 2642000000,
  totalCustomers: 4301,
  totalLoanPortfolio: 1023000000,
  totalRevenue: 60200000,
  reportingPeriod: "June 2026",
};