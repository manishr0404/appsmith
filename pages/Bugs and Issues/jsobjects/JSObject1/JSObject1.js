export default {
openSetup: async () => {
		if(appsmith.mode == "EDIT") {showModal('Modal1')}
},
getAirTableData : () => {
	      if (appsmith?.store?.baseId?.length==0 && appsmith?.store?.tableName?.length==0) {
			  return getBase1.data.records.map(record => {
				let row = record.fields;
				row['id'] = record.id;
				return row;
      })
      } else {
				JSObject1.storeInfo()
        return getBase.data.records.map(record => {
				let row = record.fields;
				row['id'] = record.id;
				return row;
      })
	}}, 
	
	viewAttachment: () => {
		showModal(
			List1.selectedItem.type == 'application/pdf' ? 'mdl_PDF' : 
			List1.selectedItem.type.match('image') ?'mdl_Image' :	
			List1.selectedItem.type.match('video') ?'mdl_Video' :	
		'')
	},
	
	filetypeIcon: (type = List1.selectedItem.type) => {
		return type.match('pdf') ? 'document' :
		type.match('image') ?'camera' :	
		type.match('video') ?'video' :	
		'play'

	},

	associatedFeatures: () => {
		const features = List2.selectedItem.Associated_features
		return(features.toString())
	},
	
		bugTitle: () => {
		const features = List2.selectedItem.Name
		return(features.toString())
	},
	
		assignedTo: () => {
		const assign = List2.selectedItem.Assigned_to
		return(assign.toString())
	},
	
	highPriority: () => {
			      if (appsmith?.store?.baseId.length==0 && appsmith?.store?.tableName.length==0) {
			  		const high= getBase1.data.records.map(record => record.fields.Priority)
						return high.filter((currentItem) => currentItem == 'High').length;
      }
      else {
        const high= getBase.data.records.map(record => record.fields.Priority)
				return high.filter((currentItem) => currentItem == 'High').length;
      }
	},
	
		criticalBugs: () => {
						      if (appsmith?.store?.baseId.length==0 && appsmith?.store?.tableName.length==0) {
			  		const critical= getBase1.data.records.map(record => record.fields.Priority)
		return critical.filter((currentItem) => currentItem == 'Critical').length;
      }
      else {
        const critical= getBase.data.records.map(record => record.fields.Priority)
		return critical.filter((currentItem) => currentItem == 'Critical').length;
      }
		
	},
	
	open_Bugs: () => {
					      if (appsmith?.store?.baseId.length==0 && appsmith?.store?.tableName.length==0) {
			  		const open= getBase1.data.records.map(record => record.fields.Closed)
		return open.filter((currentItem) => currentItem == null).length
      }
      else {
        const open= getBase.data.records.map(record => record.fields.Closed)
		return open.filter((currentItem) => currentItem == null).length
      }
	},
	storeBaseID: async () => {
		await storeValue('baseId', in_baseId.text);
		return(appsmith.store.baseId)
},
		storeTableName: async () => {
		await storeValue('tableName', in_tableName.text);
		return(appsmith.store.tableName)
},
	
storeInfo: async () => {
		      if (appsmith?.store?.baseId?.length==0 && appsmith?.store?.tableName?.length==0) {
			  return getBase1.data.records.map(record => {
				let row = record.fields;
				row['id'] = record.id;
				return row;
      })
      } else {
		await storeValue('baseId', in_baseId.text);
		await storeValue('tableName', in_tableName.text);
		showAlert('Airtable details have been set!');
	  await getBase.run();
	  closeModal('Modal1');
      }		
},
	
	addBug: async() => {
		InsertQuery.run();
		getBase.run();
		closeModal('Modal2');
}	
}