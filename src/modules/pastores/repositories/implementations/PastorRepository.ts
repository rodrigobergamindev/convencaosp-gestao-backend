
import { IPastorRepository, ICreatePastorDTO, IUpdatePastorDTO} from '../IPastorRepository'
import {db} from '../../../../services/firestore'
import { DocumentData, FieldValue} from 'firebase-admin/firestore';
import { deletePhoto } from '../../../../services/photos';

class PastorRepository implements IPastorRepository {

    private pastores: DocumentData[];

    private static INSTANCE: PastorRepository;

    private constructor() {
        this.pastores = [];
    }

    public static getInstance(): PastorRepository {
        if(!PastorRepository.INSTANCE) {
            PastorRepository.INSTANCE = new PastorRepository()
        }

        return PastorRepository.INSTANCE
    }

    async findByRM(rm: string): Promise <DocumentData> {
        const pastorRef = await db.collection('Pastores').doc(rm)

        const pastor = (await pastorRef.get()).data()
        const observacao =  (await pastorRef.collection('Observacao').doc(rm).get()).data()
        const contato =  (await pastorRef.collection('Contato').doc(rm).get()).data()
        const endereco = (await pastorRef.collection('Endereço').doc(rm).get()).data()
        const log =  (await pastorRef.collection('Logs').doc(rm).get()).data()

        const data = {
            ...pastor, 
            observacao: observacao.data,
            contato: contato.data,
            endereco: endereco.data,
            log
        }
    
        return data
    }

    async list(): Promise <DocumentData[]>  {
        const collectionRef = await db.collection('Pastores')
        
        const data = await collectionRef.get()
        
        if(data.empty){
            return null
        }

      await data.forEach(async doc => {

        const rm = doc.id

        const pastorRef = await collectionRef.doc(rm)

        const oficial = (await pastorRef.get()).data()
        const observacao = (await pastorRef.collection('Observacao').doc(rm).get()).data()
        const contato = (await pastorRef.collection('Contato').doc(rm).get()).data()
        const endereco = (await pastorRef.collection('Endereço').doc(rm).get()).data()
        const log = (await pastorRef.collection('Logs').doc(rm).get()).data()
        
        const data = {
            ...oficial, 
            observacao: observacao.data,
            contato: contato.data,
            endereco: endereco.data,
            log
        }

        
        this.pastores.push(data)

        })

   
        return this.pastores
    }   

    async create(data: ICreatePastorDTO): Promise<void> {
        const batch = db.batch()
        const { rm, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, igreja_sede, foto, credencial, observacao , contato, endereco } = data
        

        const pastorRef = await db.collection('Pastores').doc(rm)
        const observacaoRef = await pastorRef.collection('Observacao').doc(rm)
        const contatoRef = await pastorRef.collection('Contato').doc(rm)
        const enderecoRef = await pastorRef.collection('Endereço').doc(rm)
        const logRef = await pastorRef.collection('Logs').doc(rm)

     
        
                if(!!observacao){
                    batch.set(observacaoRef, {
                        data: observacao
                    })
                }
            
                if(foto){
                    batch.set(pastorRef, {
                        rm, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto, credencial, igreja_sede
                    })
                }

                if(!foto){
                    batch.set(pastorRef, {
                        rm, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, credencial, igreja_sede
                    })
                }
        
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

    async update(data: IUpdatePastorDTO): Promise<void> {
        
        const batch = db.batch()
        const { rm, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, igreja_sede, foto, credencial, observacao , contato, endereco } = data
        

        const pastorRef = await db.collection('Pastores').doc(rm)
        const observacaoRef = await pastorRef.collection('Observacao').doc(rm)
        const contatoRef = await pastorRef.collection('Contato').doc(rm)
        const enderecoRef = await pastorRef.collection('Endereço').doc(rm)
        const logRef = await pastorRef.collection('Logs').doc(rm)

     
        
                if(!!observacao){
                    batch.set(observacaoRef, {
                        data: observacao
                    })
                }
            
                if(foto){
                    batch.set(pastorRef, {
                        rm, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, foto, credencial, igreja_sede
                    })
                }

                if(!foto){
                    batch.set(pastorRef, {
                        rm, titulo, status, nome, funcao, rg, cpf, nascimento, consagracao, credencial, igreja_sede
                    })
                }
        
                batch.set(enderecoRef, {
                    data: endereco
                })
        
                batch.set(contatoRef, {
                    data: contato
                })

                batch.update(logRef,  
                    {
                        operations: FieldValue.arrayUnion({
                            created_at: new Date(),
                            created_by: 'admin',
                            descricao: 'Alteração de cadastro'
                        })
                    }
                )

                await batch.commit()
    
    }

    async delete(rm: string): Promise<void> {
        const pastorRef = await db.collection('Pastores').doc(rm)
        const observacaoRef = await pastorRef.collection('Observacao').doc(rm)
        const contatoRef = await pastorRef.collection('Contato').doc(rm)
        const enderecoRef = await pastorRef.collection('Endereço').doc(rm)
        const logRef = await pastorRef.collection('Logs').doc(rm)


        const batch = db.batch()

    
                if((await observacaoRef.get()).exists){
                    batch.delete(observacaoRef)
                }

                batch.delete(contatoRef)
                batch.delete(enderecoRef)
                batch.delete(pastorRef)
                batch.delete(logRef)
                
                await deletePhoto(`RM${rm}`)
                await batch.commit()
    }
}


export {PastorRepository}