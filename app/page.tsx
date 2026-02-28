import { getStats } from 'bd-address-pro';
import AddressSelector from './components/AddressSelector';
import SearchBox from './components/SearchBox';
import Statistics from './components/Statistics';
import ValidationChecker from './components/ValidationChecker';
import DataExplorer from './components/DataExplorer';
import Link from 'next/link';

// Get statistics for the header
const stats = getStats();

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans">
      {/* Header */}
      <header className="bg-linear-to-r from-green-600 to-blue-600 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            BD Address Pro Demo <span className='text-xs'>v-1.2.0</span>
          </h1>
          <p className="text-lg opacity-90">
            Complete Bangladesh location database with {stats.totalDivisions} divisions, {stats.totalDistricts} districts, {stats.totalUpazilas} upazilas, and {stats.totalUnions} unions
          </p>
          <p className='text-xs italic'>Last updated: 28 February, 2026</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-8 px-4 space-y-8">
        {/* Statistics Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <Statistics />
        </section>

        {/* Cascading Address Selector */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <AddressSelector />
        </section>

        {/* Search Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <SearchBox />
        </section>

        {/* Validation Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <ValidationChecker />
        </section>

        {/* Data Explorer Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <DataExplorer />
        </section>

        {/* API Reference Quick Guide */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">API Reference Quick Guide</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Data Access</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• getAllDivisions()</li>
                <li>• getAllDistricts()</li>
                <li>• getAllUpazilas()</li>
                <li>• getAllUnions()</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Division Functions</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• getDivisionById(id)</li>
                <li>• getDivisionBySlug(slug)</li>
                <li>• getDivisionByName(name)</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">District Functions</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• getDistrictById(id)</li>
                <li>• getDistrictBySlug(slug)</li>
                <li>• getDistrictsByDivision(id)</li>
                <li>• getDistrictsByDivisionSlug(slug)</li>
              </ul>
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Upazila Functions</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• getUpazilaById(id)</li>
                <li>• getUpazilaBySlug(slug)</li>
                <li>• getUpazilasByDistrict(id)</li>
                <li>• getUpazilasByDivision(id)</li>
              </ul>
            </div>

            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
              <h3 className="font-semibold text-teal-800 dark:text-teal-300 mb-2">Union Functions</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• getUnionById(id)</li>
                <li>• getUnionBySlug(slug)</li>
                <li>• getUnionsByUpazila(id)</li>
                <li>• getUnionsByDistrict(id)</li>
                <li>• getUnionsByDivision(id)</li>
              </ul>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">Search Functions</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• search(query, options?)</li>
                <li>• quickSearch(query)</li>
                <li>• autocomplete(query)</li>
                <li>• fuzzySearch(query)</li>
                <li>• searchUnions(query)</li>
              </ul>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Validation Functions</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• isValidDivision(id)</li>
                <li>• isValidDistrict(id)</li>
                <li>• isValidUpazila(id)</li>
                <li>• isDistrictInDivision(d, div)</li>
                <li>• isUpazilaInDistrict(u, d)</li>
              </ul>
            </div>

            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
              <h3 className="font-semibold text-cyan-800 dark:text-cyan-300 mb-2">Relationship Functions</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• getDivisionOfDistrict(id)</li>
                <li>• getDistrictOfUpazila(id)</li>
                <li>• getUpazilaOfUnion(id)</li>
                <li>• getFullAddress(upazilaId)</li>
                <li>• getFullAddressOfUnion(unionId)</li>
              </ul>
            </div>

            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <h3 className="font-semibold text-pink-800 dark:text-pink-300 mb-2">Formatting Functions</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• formatAddress(addr, opts?)</li>
                <li>• formatAddressBengali(addr)</li>
                <li>• formatAddressEnglish(addr)</li>
              </ul>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h3 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2">List Helpers</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• getDivisionNames(lang?)</li>
                <li>• getDistrictNames(lang?)</li>
                <li>• getDivisionOptions()</li>
                <li>• getDistrictOptions(divId?)</li>
                <li>• getUpazilaOptions(distId?)</li>
                <li>• getUnionOptions(upazilaId?)</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
              <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">Postal Code Functions</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• getDistrictPostalCode(id)</li>
                <li>• getUpazilaPostalCode(id)</li>
                <li>• getUnionPostalCode(id)</li>
                <li>• getPostalInfo(upazilaId)</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
              <h3 className="font-semibold text-slate-800 dark:text-slate-300 mb-2">Raw Data Access</h3>
              <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                <li>• getRawDivisions()</li>
                <li>• getRawDistricts()</li>
                <li>• getRawUpazilas()</li>
                <li>• getRawUnions()</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 dark:text-gray-400 py-4">
          <p>Powered by <Link target='_blank' href={'https://www.npmjs.com/package/bd-address-pro'}><strong>bd-address-pro</strong></Link> - Complete Bangladesh location database</p>
          <p>Developed by <Link target='_blank' href={'https://abidhasan.vercel.app'}><strong>Abid Hasan</strong></Link></p>
        </footer>
      </main>
    </div>
  );
}
