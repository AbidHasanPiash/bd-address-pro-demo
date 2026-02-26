'use client';

import { useState } from 'react';
import {
  isValidDivision,
  isValidDistrict,
  isValidUpazila,
  isDistrictInDivision,
  isUpazilaInDistrict,
  isUpazilaInDivision,
  getAllDivisions,
  getAllDistricts,
  getAllUpazilas,
} from 'bd-address-pro';

export default function ValidationChecker() {
  const divisions = getAllDivisions();
  const districts = getAllDistricts();
  const upazilas = getAllUpazilas();

  // ID Validation State
  const [divisionId, setDivisionId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [upazilaId, setUpazilaId] = useState('');

  // Relationship Validation State
  const [relDistrictId, setRelDistrictId] = useState('');
  const [relDivisionId, setRelDivisionId] = useState('');
  const [relUpazilaId, setRelUpazilaId] = useState('');
  const [relDistrictId2, setRelDistrictId2] = useState('');
  const [relUpazilaId2, setRelUpazilaId2] = useState('');
  const [relDivisionId2, setRelDivisionId2] = useState('');

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">Validation Functions</h2>
      
      {/* ID Validation */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">ID Validation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Division ID Check */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              isValidDivision(id)
            </label>
            <input
              type="number"
              value={divisionId}
              onChange={(e) => setDivisionId(e.target.value)}
              placeholder="Enter Division ID (1-8)"
              className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {divisionId && (
              <div className={`p-2 rounded text-center font-medium ${
                isValidDivision(Number(divisionId))
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}>
                {isValidDivision(Number(divisionId)) ? '✓ Valid' : '✗ Invalid'}
              </div>
            )}
          </div>

          {/* District ID Check */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              isValidDistrict(id)
            </label>
            <input
              type="number"
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
              placeholder="Enter District ID (1-64)"
              className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {districtId && (
              <div className={`p-2 rounded text-center font-medium ${
                isValidDistrict(Number(districtId))
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}>
                {isValidDistrict(Number(districtId)) ? '✓ Valid' : '✗ Invalid'}
              </div>
            )}
          </div>

          {/* Upazila ID Check */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              isValidUpazila(id)
            </label>
            <input
              type="number"
              value={upazilaId}
              onChange={(e) => setUpazilaId(e.target.value)}
              placeholder="Enter Upazila ID (1-495)"
              className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {upazilaId && (
              <div className={`p-2 rounded text-center font-medium ${
                isValidUpazila(Number(upazilaId))
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
              }`}>
                {isValidUpazila(Number(upazilaId)) ? '✓ Valid' : '✗ Invalid'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Relationship Validation */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Relationship Validation</h3>
        
        <div className="space-y-4">
          {/* isDistrictInDivision */}
          <div className="p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              isDistrictInDivision(districtId, divisionId)
            </label>
            <div className="flex flex-wrap gap-2 items-center">
              <select
                value={relDistrictId}
                onChange={(e) => setRelDistrictId(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <span className="text-gray-500">in</span>
              <select
                value={relDivisionId}
                onChange={(e) => setRelDivisionId(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Division</option>
                {divisions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              {relDistrictId && relDivisionId && (
                <div className={`px-3 py-1 rounded font-medium ${
                  isDistrictInDivision(Number(relDistrictId), Number(relDivisionId))
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {isDistrictInDivision(Number(relDistrictId), Number(relDivisionId)) ? '✓ Yes' : '✗ No'}
                </div>
              )}
            </div>
          </div>

          {/* isUpazilaInDistrict */}
          <div className="p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              isUpazilaInDistrict(upazilaId, districtId)
            </label>
            <div className="flex flex-wrap gap-2 items-center">
              <select
                value={relUpazilaId}
                onChange={(e) => setRelUpazilaId(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              <span className="text-gray-500">in</span>
              <select
                value={relDistrictId2}
                onChange={(e) => setRelDistrictId2(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              {relUpazilaId && relDistrictId2 && (
                <div className={`px-3 py-1 rounded font-medium ${
                  isUpazilaInDistrict(Number(relUpazilaId), Number(relDistrictId2))
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {isUpazilaInDistrict(Number(relUpazilaId), Number(relDistrictId2)) ? '✓ Yes' : '✗ No'}
                </div>
              )}
            </div>
          </div>

          {/* isUpazilaInDivision */}
          <div className="p-3 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              isUpazilaInDivision(upazilaId, divisionId)
            </label>
            <div className="flex flex-wrap gap-2 items-center">
              <select
                value={relUpazilaId2}
                onChange={(e) => setRelUpazilaId2(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              <span className="text-gray-500">in</span>
              <select
                value={relDivisionId2}
                onChange={(e) => setRelDivisionId2(e.target.value)}
                className="p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="">Select Division</option>
                {divisions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              {relUpazilaId2 && relDivisionId2 && (
                <div className={`px-3 py-1 rounded font-medium ${
                  isUpazilaInDivision(Number(relUpazilaId2), Number(relDivisionId2))
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {isUpazilaInDivision(Number(relUpazilaId2), Number(relDivisionId2)) ? '✓ Yes' : '✗ No'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
