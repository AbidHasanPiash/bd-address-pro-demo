'use client';

import { useState } from 'react';
import {
  getDivisionNames,
  getDistrictNames,
  getUpazilaNames,
  getRawDivisions,
  getRawDistricts,
  getRawUpazilas,
  getRawUnions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  getUpazilasByDivision,
  getUnionsByUpazila,
  getUnionsByDistrict,
  getUnionsByDivision,
  getDivisionOfDistrict,
  getDistrictOfUpazila,
  getUpazilaOfUnion,
  getFullAddress,
  getFullAddressOfUnion,
  getAllDivisions,
  getAllDistricts,
  getAllUpazilas,
  getAllUnions,
  getPostalInfo,
  getDistrictPostalCode,
  getUpazilaPostalCode,
  getUnionPostalCode,
} from 'bd-address-pro';

type TabType = 'names' | 'raw' | 'hierarchy' | 'lookup' | 'postal';

export default function DataExplorer() {
  const [activeTab, setActiveTab] = useState<TabType>('names');
  const [language, setLanguage] = useState<'en' | 'bn'>('en');
  
  // Hierarchy state
  const [selectedDivisionId, setSelectedDivisionId] = useState<number | null>(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
  const [selectedUpazilaId, setSelectedUpazilaId] = useState<number | null>(null);
  
  // Lookup state
  const [lookupDistrictId, setLookupDistrictId] = useState('');
  const [lookupUpazilaId, setLookupUpazilaId] = useState('');
  const [lookupUnionId, setLookupUnionId] = useState('');
  
  // Postal code state
  const [postalDistrictId, setPostalDistrictId] = useState('');
  const [postalUpazilaId, setPostalUpazilaId] = useState('');
  const [postalUnionId, setPostalUnionId] = useState('');

  const divisions = getAllDivisions();
  const districts = getAllDistricts();
  const upazilas = getAllUpazilas();
  const unions = getAllUnions();

  const tabs: { id: TabType; label: string }[] = [
    { id: 'names', label: 'Name Lists' },
    { id: 'raw', label: 'Raw Data' },
    { id: 'hierarchy', label: 'Hierarchy' },
    { id: 'lookup', label: 'Lookup' },
    { id: 'postal', label: 'Postal Codes' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">Data Explorer</h2>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Names Tab */}
      {activeTab === 'names' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded ${
                language === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('bn')}
              className={`px-4 py-2 rounded ${
                language === 'bn'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              বাংলা
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Division Names ({getDivisionNames(language).length})</h4>
              <ul className="text-sm space-y-1 max-h-60 overflow-auto">
                {getDivisionNames(language).map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">District Names ({getDistrictNames(language).length})</h4>
              <ul className="text-sm space-y-1 max-h-60 overflow-auto">
                {getDistrictNames(language).map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Upazila Names ({getUpazilaNames(language).length})</h4>
              <ul className="text-sm space-y-1 max-h-60 overflow-auto">
                {getUpazilaNames(language).map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Union Names ({unions.length})</h4>
              <ul className="text-sm space-y-1 max-h-60 overflow-auto">
                {unions.slice(0, 100).map((union) => (
                  <li key={union.id}>{language === 'en' ? union.name : union.bnName}</li>
                ))}
                <li className="text-gray-500 italic">... and {unions.length - 100} more</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Raw Data Tab */}
      {activeTab === 'raw' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Raw Divisions ({getRawDivisions().length})</h4>
              <pre className="text-xs overflow-auto max-h-60">
                {JSON.stringify(getRawDivisions(), null, 2)}
              </pre>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Raw Districts (first 5 of {getRawDistricts().length})</h4>
              <pre className="text-xs overflow-auto max-h-60">
                {JSON.stringify(getRawDistricts().slice(0, 5), null, 2)}
              </pre>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Raw Upazilas (first 5 of {getRawUpazilas().length})</h4>
              <pre className="text-xs overflow-auto max-h-60">
                {JSON.stringify(getRawUpazilas().slice(0, 5), null, 2)}
              </pre>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Raw Unions (first 5 of {getRawUnions().length})</h4>
              <pre className="text-xs overflow-auto max-h-60">
                {JSON.stringify(getRawUnions().slice(0, 5), null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Hierarchy Tab */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Districts/Upazilas/Unions by Division */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">By Division</h4>
              <select
                value={selectedDivisionId || ''}
                onChange={(e) => {
                  setSelectedDivisionId(e.target.value ? Number(e.target.value) : null);
                  setSelectedDistrictId(null);
                  setSelectedUpazilaId(null);
                }}
                className="w-full p-2 mb-2 border rounded dark:bg-gray-700"
              >
                <option value="">Select Division</option>
                {divisions.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              
              {selectedDivisionId && (
                <div className="space-y-2">
                  <div>
                    <strong>Districts ({getDistrictsByDivision(selectedDivisionId).length}):</strong>
                    <ul className="text-sm mt-1 max-h-24 overflow-auto">
                      {getDistrictsByDivision(selectedDivisionId).map((d) => (
                        <li key={d.id}>{d.name} ({d.bnName})</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Upazilas ({getUpazilasByDivision(selectedDivisionId).length}):</strong>
                    <ul className="text-sm mt-1 max-h-24 overflow-auto">
                      {getUpazilasByDivision(selectedDivisionId).slice(0, 10).map((u) => (
                        <li key={u.id}>{u.name} ({u.bnName})</li>
                      ))}
                      {getUpazilasByDivision(selectedDivisionId).length > 10 && (
                        <li className="text-gray-500">... and {getUpazilasByDivision(selectedDivisionId).length - 10} more</li>
                      )}
                    </ul>
                  </div>
                  <div>
                    <strong>Unions ({getUnionsByDivision(selectedDivisionId).length}):</strong>
                    <ul className="text-sm mt-1 max-h-24 overflow-auto">
                      {getUnionsByDivision(selectedDivisionId).slice(0, 10).map((u) => (
                        <li key={u.id}>{u.name} ({u.bnName})</li>
                      ))}
                      {getUnionsByDivision(selectedDivisionId).length > 10 && (
                        <li className="text-gray-500">... and {getUnionsByDivision(selectedDivisionId).length - 10} more</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Upazilas/Unions by District */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">By District</h4>
              <select
                value={selectedDistrictId || ''}
                onChange={(e) => {
                  setSelectedDistrictId(e.target.value ? Number(e.target.value) : null);
                  setSelectedUpazilaId(null);
                }}
                className="w-full p-2 mb-2 border rounded dark:bg-gray-700"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              
              {selectedDistrictId && (
                <div className="space-y-2">
                  <div>
                    <strong>Upazilas ({getUpazilasByDistrict(selectedDistrictId).length}):</strong>
                    <ul className="text-sm mt-1 max-h-32 overflow-auto">
                      {getUpazilasByDistrict(selectedDistrictId).map((u) => (
                        <li key={u.id}>{u.name} ({u.bnName})</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong>Unions ({getUnionsByDistrict(selectedDistrictId).length}):</strong>
                    <ul className="text-sm mt-1 max-h-32 overflow-auto">
                      {getUnionsByDistrict(selectedDistrictId).slice(0, 15).map((u) => (
                        <li key={u.id}>{u.name} ({u.bnName})</li>
                      ))}
                      {getUnionsByDistrict(selectedDistrictId).length > 15 && (
                        <li className="text-gray-500">... and {getUnionsByDistrict(selectedDistrictId).length - 15} more</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Unions by Upazila */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">Unions by Upazila</h4>
              <select
                value={selectedUpazilaId || ''}
                onChange={(e) => setSelectedUpazilaId(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-2 mb-2 border rounded dark:bg-gray-700"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((u) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
              
              {selectedUpazilaId && (
                <div>
                  <strong>Unions ({getUnionsByUpazila(selectedUpazilaId).length}):</strong>
                  <ul className="text-sm mt-1 max-h-64 overflow-auto">
                    {getUnionsByUpazila(selectedUpazilaId).map((u) => (
                      <li key={u.id}>{u.name} ({u.bnName})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lookup Tab */}
      {activeTab === 'lookup' && (
        <div className="space-y-4">
          {/* getDivisionOfDistrict */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2">getDivisionOfDistrict(districtId)</h4>
            <div className="flex flex-wrap gap-2 items-center">
              <select
                value={lookupDistrictId}
                onChange={(e) => setLookupDistrictId(e.target.value)}
                className="p-2 border rounded dark:bg-gray-700"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              {lookupDistrictId && (
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                  Parent Division: <strong>{getDivisionOfDistrict(Number(lookupDistrictId))?.name}</strong>
                </div>
              )}
            </div>
          </div>

          {/* getDistrictOfUpazila & getFullAddress */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2">getDistrictOfUpazila(upazilaId) & getFullAddress(upazilaId)</h4>
            <div className="flex flex-wrap gap-2 items-start">
              <select
                value={lookupUpazilaId}
                onChange={(e) => setLookupUpazilaId(e.target.value)}
                className="p-2 border rounded dark:bg-gray-700"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((u) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
              {lookupUpazilaId && (
                <div className="space-y-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded">
                    Parent District: <strong>{getDistrictOfUpazila(Number(lookupUpazilaId))?.name}</strong>
                  </div>
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
                    <strong>Full Address:</strong>
                    <pre className="text-xs mt-1">
                      {JSON.stringify(getFullAddress(Number(lookupUpazilaId)), null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* getUpazilaOfUnion & getFullAddressOfUnion */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2">getUpazilaOfUnion(unionId) & getFullAddressOfUnion(unionId)</h4>
            <div className="flex flex-wrap gap-2 items-start">
              <select
                value={lookupUnionId}
                onChange={(e) => setLookupUnionId(e.target.value)}
                className="p-2 border rounded dark:bg-gray-700"
              >
                <option value="">Select Union</option>
                {unions.slice(0, 200).map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.bnName})</option>
                ))}
              </select>
              {lookupUnionId && (
                <div className="space-y-2 flex-1">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded">
                    Parent Upazila: <strong>{getUpazilaOfUnion(Number(lookupUnionId))?.name}</strong>
                  </div>
                  <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded">
                    <strong>Full Address (with Union):</strong>
                    <pre className="text-xs mt-1 overflow-auto">
                      {JSON.stringify(getFullAddressOfUnion(Number(lookupUnionId)), null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Postal Codes Tab */}
      {activeTab === 'postal' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* District Postal Code */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">getDistrictPostalCode(districtId)</h4>
              <select
                value={postalDistrictId}
                onChange={(e) => setPostalDistrictId(e.target.value)}
                className="w-full p-2 mb-2 border rounded dark:bg-gray-700"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              {postalDistrictId && (
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Postal Code Range:</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {getDistrictPostalCode(Number(postalDistrictId)) || 'N/A'}
                  </p>
                </div>
              )}
            </div>

            {/* Upazila Postal Code */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">getUpazilaPostalCode(upazilaId)</h4>
              <select
                value={postalUpazilaId}
                onChange={(e) => setPostalUpazilaId(e.target.value)}
                className="w-full p-2 mb-2 border rounded dark:bg-gray-700"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((u) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
              {postalUpazilaId && (
                <div className="space-y-2">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Postal Code:</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      {getUpazilaPostalCode(Number(postalUpazilaId)) || 'N/A'}
                    </p>
                  </div>
                  {getPostalInfo(Number(postalUpazilaId)) && (
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Full Postal Info:</p>
                      <pre className="text-xs mt-1">
                        {JSON.stringify(getPostalInfo(Number(postalUpazilaId)), null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Union Postal Code */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-2">getUnionPostalCode(unionId)</h4>
              <select
                value={postalUnionId}
                onChange={(e) => setPostalUnionId(e.target.value)}
                className="w-full p-2 mb-2 border rounded dark:bg-gray-700"
              >
                <option value="">Select Union</option>
                {unions.slice(0, 200).map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.bnName})</option>
                ))}
              </select>
              {postalUnionId && (
                <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Postal Code (via Upazila):</p>
                  <p className="text-xl font-bold text-teal-600 dark:text-teal-400">
                    {getUnionPostalCode(Number(postalUnionId)) || 'N/A'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
