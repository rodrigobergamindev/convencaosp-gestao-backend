
import { IOficialRepository, ICreateOficialDTO, IUpdateOficialDTO} from '../IOficialRepository'
import {db} from '../../../../services/firestore'
import { DocumentData, FieldValue} from 'firebase-admin/firestore';
import { deletePhoto } from '../../../../services/photos';


class OficialRepository implements IOficialRepository {

    private oficiais: any[];

    private static INSTANCE: OficialRepository;

    private constructor() {
        this.oficiais = [];
    }

    public static getInstance(): OficialRepository {
        if(!OficialRepository.INSTANCE) {
            OficialRepository.INSTANCE = new OficialRepository()
        }

        return OficialRepository.INSTANCE
    }

    async findByRO(ro: string): Promise<DocumentData> {
        const oficialRef = await db.collection('Oficiais').doc(ro)

        const oficial = (await oficialRef.get()).data()
        const observacao =  (await oficialRef.collection('Observacao').doc(ro).get()).data()
        const anuidade =  (await oficialRef.collection('Anuidade').doc(ro).get()).data()
        const contato =  (await oficialRef.collection('Contato').doc(ro).get()).data()
        const endereco = (await oficialRef.collection('Endereço').doc(ro).get()).data()
        const log =  (await oficialRef.collection('Logs').doc(ro).get()).data()

        const data = {
            ...oficial, 
            observacao: observacao.data,
            anuidade,
            contato: contato.data,
            endereco: endereco.data,
            log
        }
    
        return data
    }


    async list(): Promise<DocumentData[]> {
        
        const collectionRef = await db.collection('Oficiais')
        
        const data = await collectionRef.get()
        
        if(data.empty){
            console.log("tá vindo aqui")
            return
        }


      await data.forEach(async doc => {
          
        const ro = doc.id

        const oficialRef = await collectionRef.doc(ro)

        const oficial = (await oficialRef.get()).data()
        const observacao = (await oficialRef.collection('Observacao').doc(ro).get()).data()
        const anuidade = (await oficialRef.collection('Anuidade').doc(ro).get()).data()
        const contato = (await oficialRef.collection('Contato').doc(ro).get()).data()
        const endereco = (await oficialRef.collection('Endereço').doc(ro).get()).data()
        const log = (await oficialRef.collection('Logs').doc(ro).get()).data()
        
        const data = {
            ...oficial, 
            observacao: observacao.data,
            anuidade,
            contato: contato.data,
            endereco: endereco.data,
            log
        }

        
        this.oficiais.push(data)
        })
        
        
        return this.oficiais

    }   

    async create(data: ICreateOficialDTO): Promise<void> {
        const batch = db.batch()
        const { ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, igreja_sede, foto, observacao , anuidade, contato, endereco } = data
        

        const oficialRef = await db.collection('Oficiais').doc(ro)
        const observacaoRef = await oficialRef.collection('Observacao').doc(ro)
        const anuidadeRef = await oficialRef.collection('Anuidade').doc(ro)
        const contatoRef = await oficialRef.collection('Contato').doc(ro)
        const enderecoRef = await oficialRef.collection('Endereço').doc(ro)
        const logRef = await oficialRef.collection('Logs').doc(ro)

     

            if(anuidade){
                batch.set(anuidadeRef, {
                   ...anuidade
                })
               }
        
                if(observacao !== null){
                    batch.set(observacaoRef, {
                        data: observacao
                    })
                }
            
                batch.set(oficialRef, {
                    ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto, igreja_sede
                })
        
                batch.set(enderecoRef, {
                    data: endereco
                })
        
                batch.set(contatoRef, {
                    data: contato
                })

                batch.set(logRef,  
                    {
                        operations: FieldValue.arrayUnion({
                            created_at: new Date(),
                            created_by: 'admin',
                            descricao: 'Criação de registro'
                        })
                    }
                )

                await batch.commit()
        
    }

    async update(data: IUpdateOficialDTO): Promise<void> {
        const batch = db.batch()

        const { ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto, observacao , anuidade, contato, endereco } = data

        const oficialRef = await db.collection('Oficiais').doc(ro)
        const observacaoRef = await oficialRef.collection('Observacao').doc(ro)
        const anuidadeRef = await oficialRef.collection('Anuidade').doc(ro)
        const contatoRef = await oficialRef.collection('Contato').doc(ro)
        const enderecoRef = await oficialRef.collection('Endereço').doc(ro)
        const logRef = await oficialRef.collection('Logs').doc(ro)


            if(anuidade){
                batch.update(anuidadeRef, {
                    ...anuidade
                })
               }
        
               if(observacao !== null){
                batch.update(observacaoRef, {
                    data: observacao
                })
            }
                
                batch.update(oficialRef, {
                    ro, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto
                })
                
        
                batch.update(enderecoRef, {
                    data: endereco
                })
        
                batch.update(contatoRef, {
                    data: contato
                })
        
                batch.update(logRef, {
                        operations: FieldValue.arrayUnion({
                            updated_at: new Date(),
                            descricao: 'Alteração de cadastro',
                            updated_by: 'admin'
                        })
                })

                await batch.commit()

        
    }

    async delete(ro: string): Promise<void> {

        const oficialRef = await db.collection('Oficiais').doc(ro)

        const observacaoRef = await oficialRef.collection('Observacao').doc(ro)
        const anuidadeRef = await oficialRef.collection('Anuidade').doc(ro)
        const contatoRef = await oficialRef.collection('Contato').doc(ro)
        const enderecoRef = await oficialRef.collection('Endereço').doc(ro)
        const logRef = await oficialRef.collection('Logs').doc(ro)

    

        const batch = db.batch()

    
                if((await observacaoRef.get()).exists){
                    batch.delete(observacaoRef)
                }

                if((await anuidadeRef.get()).exists){
                    batch.delete(anuidadeRef)
                }

                batch.delete(contatoRef)
                batch.delete(enderecoRef)
                batch.delete(oficialRef)
                batch.delete(logRef)
                
                await deletePhoto(`RO${ro}`)
                await batch.commit()
    }
}


export {OficialRepository}