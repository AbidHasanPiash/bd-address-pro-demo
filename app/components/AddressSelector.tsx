'use client';

import { useState } from 'react';
import {
  getDivisionOptions,
  getDistrictOptions,
  getUpazilaOptions,
  getDivisionBySlug,
  getDistrictBySlug,
  getUpazilaBySlug,
  getFullAddress,
  formatAddress,
  formatAddressBengali,
  formatAddressEnglish,
} from 'bd-address-pro';

export default function AddressSelector() {
  const [divisionSlug, setDivisionSlug] = useState('');
  const [districtSlug, setDistrictSlug] = useState('');
  const [upazilaSlug, setUpazilaSlug] = useState('');

  const divisions = getDivisionOptions();
  const division = divisionSlug ? getDivisionBySlug(divisionSlug) : null;
  const districts = division ? getDistrictOptions(division.id) : [];
  const district = districtSlug ? getDistrictBySlug(districtSlug) : null;
  const upazilas = district ? getUpazilaOptions(district.id) : [];
  const upazila = upazilaSlug ? getUpazilaBySlug(upazilaSlug) : null;

  const fullAddress = upazila ? getFullAddress(upazila.id) : null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">Cascading Address Selector</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Division (বিভাগ)
          </label>
          <select
            value={divisionSlug}
            onChange={(e) => {
              setDivisionSlug(e.target.value);
              setDistrictSlug('');
              setUpazilaSlug('');
            }}
            className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select Division</option>
            {divisions.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label} ({d.labelBn})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            District (জেলা)
          </label>
          <select
            value={districtSlug}
            onChange={(e) => {
              setDistrictSlug(e.target.value);
              setUpazilaSlug('');
            }}
            disabled={!divisionSlug}
            className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50"
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label} ({d.labelBn})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Upazila (উপজেলা)
          </label>
          <select
            value={upazilaSlug}
            onChange={(e) => setUpazilaSlug(e.target.value)}
            disabled={!districtSlug}
            className="w-full p-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-50"
          >
            <option value="">Select Upazila</option>
            {upazilas.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label} ({u.labelBn})
              </option>
            ))}
          </select>
        </div>
      </div>

      {fullAddress && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">Formatted Address</h3>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">English:</span> {formatAddressEnglish(fullAddress)}</p>
            <p><span className="font-medium">Bengali:</span> {formatAddressBengali(fullAddress)}</p>
            <p><span className="font-medium">Custom (→):</span> {formatAddress(fullAddress, { separator: ' → ' })}</p>
          </div>
        </div>
      )}

      {division && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Selected Division Details</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(division, null, 2)}</pre>
        </div>
      )}

      {district && (
        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Selected District Details</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(district, null, 2)}</pre>
        </div>
      )}

      {upazila && (
        <div className="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
          <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">Selected Upazila Details</h3>
          <pre className="text-xs overflow-auto">{JSON.stringify(upazila, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
