'use client';

import { useState } from 'react';
import {
  getStats,
  getDistrictCount,
  getUpazilaCount,
  getUpazilaCountByDivision,
  getAllDivisions,
  getAllDistricts,
  getAllUpazilas,
  getUnionsByUpazila,
  getUnionsByDistrict,
  getUnionsByDivision,
} from 'bd-address-pro';

export default function Statistics() {
  const stats = getStats();
  const divisions = getAllDivisions();
  const districts = getAllDistricts();
  const upazilas = getAllUpazilas();
  
  const [selectedDivisionId, setSelectedDivisionId] = useState<number | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
  const [selectedUpazilaId, setSelectedUpazilaId] = useState<number | null>(null);

  const divisionDistrictCount = selectedDivisionId ? getDistrictCount(selectedDivisionId) : null;
  const divisionUpazilaCount = selectedDivisionId ? getUpazilaCountByDivision(selectedDivisionId) : null;
  const divisionUnionCount = selectedDivisionId ? getUnionsByDivision(selectedDivisionId).length : null;
  const districtUpazilaCount = selectedDistrictId ? getUpazilaCount(selectedDistrictId) : null;
  const districtUnionCount = selectedDistrictId ? getUnionsByDistrict(selectedDistrictId).length : null;
  const upazilaUnionCount = selectedUpazilaId ? getUnionsByUpazila(selectedUpazilaId).length : null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">Statistics</h2>
      
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-center">
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalDivisions}</p>
          <p className="text-sm text-blue-800 dark:text-blue-300">Divisions (বিভাগ)</p>
        </div>
        <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg text-center">
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.totalDistricts}</p>
          <p className="text-sm text-green-800 dark:text-green-300">Districts (জেলা)</p>
        </div>
        <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-center">
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.totalUpazilas}</p>
          <p className="text-sm text-purple-800 dark:text-purple-300">Upazilas (উপজেলা)</p>
        </div>
        <div className="p-4 bg-teal-100 dark:bg-teal-900/30 rounded-lg text-center">
          <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">{stats.totalUnions}</p>
          <p className="text-sm text-teal-800 dark:text-teal-300">Unions (ইউনিয়ন)</p>
        </div>
      </div>

      {/* Division Stats Lookup */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Get Division Statistics</h3>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <select
            value={selectedDivisionId || ''}
            onChange={(e) => setSelectedDivisionId(e.target.value ? Number(e.target.value) : null)}
            className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select Division</option>
            {divisions.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.bnName})
              </option>
            ))}
          </select>
          
          {selectedDivisionId && (
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                <span className="text-sm text-gray-600 dark:text-gray-400">Districts: </span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{divisionDistrictCount}</span>
              </div>
              <div className="px-4 py-2 bg-purple-50 dark:bg-purple-900/30 rounded">
                <span className="text-sm text-gray-600 dark:text-gray-400">Upazilas: </span>
                <span className="font-bold text-purple-600 dark:text-purple-400">{divisionUpazilaCount}</span>
              </div>
              <div className="px-4 py-2 bg-teal-50 dark:bg-teal-900/30 rounded">
                <span className="text-sm text-gray-600 dark:text-gray-400">Unions: </span>
                <span className="font-bold text-teal-600 dark:text-teal-400">{divisionUnionCount}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* District Stats Lookup */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Get District Statistics</h3>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <select
            value={selectedDistrictId || ''}
            onChange={(e) => setSelectedDistrictId(e.target.value ? Number(e.target.value) : null)}
            className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.bnName})
              </option>
            ))}
          </select>
          
          {selectedDistrictId && (
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-purple-50 dark:bg-purple-900/30 rounded">
                <span className="text-sm text-gray-600 dark:text-gray-400">Upazilas: </span>
                <span className="font-bold text-purple-600 dark:text-purple-400">{districtUpazilaCount}</span>
              </div>
              <div className="px-4 py-2 bg-teal-50 dark:bg-teal-900/30 rounded">
                <span className="text-sm text-gray-600 dark:text-gray-400">Unions: </span>
                <span className="font-bold text-teal-600 dark:text-teal-400">{districtUnionCount}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upazila Stats Lookup */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Get Upazila Statistics</h3>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <select
            value={selectedUpazilaId || ''}
            onChange={(e) => setSelectedUpazilaId(e.target.value ? Number(e.target.value) : null)}
            className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select Upazila</option>
            {upazilas.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.bnName})
              </option>
            ))}
          </select>
          
          {selectedUpazilaId && (
            <div className="px-4 py-2 bg-teal-50 dark:bg-teal-900/30 rounded">
              <span className="text-sm text-gray-600 dark:text-gray-400">Unions: </span>
              <span className="font-bold text-teal-600 dark:text-teal-400">{upazilaUnionCount}</span>
            </div>
          )}
        </div>
      </div>

      {/* Division Distribution Table */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Division Distribution</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Bengali</th>
                <th className="px-4 py-2 text-center">Districts</th>
                <th className="px-4 py-2 text-center">Upazilas</th>
                <th className="px-4 py-2 text-center">Unions</th>
              </tr>
            </thead>
            <tbody>
              {divisions.map((division) => (
                <tr key={division.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-2">{division.id}</td>
                  <td className="px-4 py-2">{division.name}</td>
                  <td className="px-4 py-2">{division.bnName}</td>
                  <td className="px-4 py-2 text-center">{getDistrictCount(division.id)}</td>
                  <td className="px-4 py-2 text-center">{getUpazilaCountByDivision(division.id)}</td>
                  <td className="px-4 py-2 text-center">{getUnionsByDivision(division.id).length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
